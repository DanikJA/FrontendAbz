import "./PostForm.css";
import { useEffect, useState } from "react";
import axios from "axios";

const PostForm = () => {
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photo: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await axios.get(
          "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
        );
        setPositions(res.data.positions);
      } catch (error) {
        console.error("Failed to load positions:", error);
      }
    };

    fetchPositions();
  }, []);

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      photo: null,
    });
    setSelectedPosition(null);

    // Очищаємо file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPosition || !formData.photo) {
      alert("Please select position and upload photo.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Отримуємо токен
      const tokenRes = await axios.get(
        "https://frontend-test-assignment-api.abz.agency/api/v1/token"
      );
      const token = tokenRes.data.token;

      // 2. Формуємо FormData
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("position_id", selectedPosition);
      data.append("photo", formData.photo);

      // 3. Відправляємо POST
      const res = await axios.post(
        "https://frontend-test-assignment-api.abz.agency/api/v1/users",
        data,
        {
          headers: {
            Token: token,
            // Не потрібно вказувати Content-Type для FormData
          },
        }
      );

      console.log("Success:", res.data);
      alert("User successfully registered!");

      // Очищаємо форму після успішної відправки
      clearForm();
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);

      // Показуємо детальну помилку користувачу
      if (err.response?.data?.message) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="post-form">
      <h2 className="post-form__title">Working with POST request</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          minLength="2"
          maxLength="60"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          disabled={isSubmitting}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          disabled={isSubmitting}
        />
        <input
          type="tel"
          name="phone"
          placeholder="+380XXXXXXXXX"
          required
          pattern="^\+380\d{9}$"
          value={formData.phone}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
          disabled={isSubmitting}
        />
        <p className="form__label">Select your position</p>
        {positions.map((pos) => (
          <label key={pos.id}>
            <input
              type="radio"
              name="position"
              value={pos.id}
              checked={selectedPosition === pos.id}
              onChange={() => setSelectedPosition(pos.id)}
              required
              disabled={isSubmitting}
            />
            {pos.name}
          </label>
        ))}
        <div className="upload-block">
          <input
            type="file"
            name="photo"
            accept=".jpg,.jpeg"
            required
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, photo: e.target.files[0] }))
            }
            disabled={isSubmitting}
          />
        </div>
        <button type="submit" className="form__submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Sign up"}
        </button>
      </form>
    </section>
  );
};

export default PostForm;
