import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";

const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    loadUsers(page); // Передаємо конкретну сторінку
  }, []);

  const loadUsers = async (page) => {
    const res = await axios.get(
      `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`
    );

    if (page === 1) {
      // Якщо це перша сторінка, замінюємо масив
      setUsers(res.data.users);
    } else {
      // Якщо це наступні сторінки, додаємо до існуючого масиву
      setUsers((prev) => [...prev, ...res.data.users]);
    }

    setTotalPages(res.data.total_pages);
    setPage(page + 1);
    console.log(res.data.users);
  };

  const handleShowMore = () => {
    loadUsers(page);
  };

  return (
    <section className="users">
      <h2 className="users__title">Working with GET request</h2>

      <div className="users__list">
        {users.map((user) => (
          <div key={user.id} className="users__card">
            <img src={user.photo} alt={user.name} width="70" height="70" />
            <p className="user__info__name">{user.name}</p>
            <p className="user__info">{user.position}</p>
            <p className="user__info">{user.email}</p>
            <p className="user__info">{user.phone}</p>
          </div>
        ))}
      </div>

      {page <= totalPages && (
        <button className="users__btn" onClick={handleShowMore}>
          Show more
        </button>
      )}
    </section>
  );
};

export default UsersSection;
