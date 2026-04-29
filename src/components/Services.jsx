const services = [
  {
    number: "01",
    title: "Website Design & Development",
    text: "From strategy to development, we provide full-cycle website design and development that helps brands communicate clearly and convert better.",
  },
  {
    number: "02",
    title: "3D Interactive Web Design",
    text: "We create immersive web visuals using Three.js, scroll animations, lighting scenes, and interactive digital experiences.",
  },
  {
    number: "03",
    title: "Ecommerce Web Development",
    text: "We design and develop product-focused ecommerce experiences that feel premium, easy to browse, and optimized for sales.",
  },
  {
    number: "04",
    title: "Branding & Graphic Design",
    text: "Our approach to branding includes logo direction, visual systems, colors, typography, social assets, and digital identity design.",
  },
];

export default function Services() {
  return (
    <section className="studio-services-section" id="services">
      <div className="services-top-scene">
        <div className="services-rings">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="services-desk">
          <div className="service-monitor">
            <span />
          </div>

          <div className="service-keyboard" />
          <div className="service-mouse" />
          <div className="service-cup" />
          <div className="service-lamp" />
        </div>
      </div>

      <div className="services-content">
        <p className="services-label">WHAT WE DO</p>

        <div className="services-title-wrap">
          <h2>SERVICES</h2>

          <p>
            We make great digital experiences by combining visual design,
            interaction, development, and brand strategy.
          </p>
        </div>

        <div className="services-cards">
          {services.map((service) => (
            <article className="studio-service-card" key={service.number}>
              <span>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
