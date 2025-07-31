import "./Hero.css";

export const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero_title">Test assignment for front-end developer</h1>
        <p className="hero_p">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <button className="hero__btn">Sign up</button>
      </div>
    </section>
  );
};

export default Hero;
