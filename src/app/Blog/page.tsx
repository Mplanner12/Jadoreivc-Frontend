"use client";

/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <div className="container mx-auto px-4 pb-16 pt-[0rem]">
      <div
        id="BlogHeader"
        className="relative h-[32rem] w-full overflow-hidden"
      >
        <Image
          src="/blog.webp"
          alt="J'adoreivc - Authentic Cultural Experiences in Côte d'Ivoire"
          layout="responsive"
          width={400}
          height={100}
          objectFit="cover"
          className="rounded-lg shadow-lg"
        />
        <motion.div
          id="BlogHeadertxt"
          className="absolute top-[40%] md:top-1/2 left-1/4 md:left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white font-bold text-4xl bg-black bg-opacity-50 px-4 py-4 rounded-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <h1 className="text-3xl md:text-5xl text-emerald-400">
            Welcome to J'adoreivc
          </h1>
          <p className="text-lg md:text-2xl text-white">
            Your Gateway to Authentic Cultural Experiences in Côte d'Ivoire
          </p>
        </motion.div>
      </div>

      <div className="mt-[0.5rem] md:mt-16 px-[2.5rem]">
        <h2 className="text-3xl font-bold mb-4 text-emerald-700">
          J'adoreivc: Experience Côte d'Ivoire Authentically
        </h2>
        <p className="text-lg mb-6">
          At J'adoreivc, we believe the heart of travel lies in authentic
          experiences. As a platform dedicated to connecting travelers with
          passionate local tour guides in Côte d'Ivoire, our mission is to offer
          unique and immersive cultural journeys that resonate deeply with both
          travelers and the communities they visit.
        </p>
        <h3 className="text-2xl font-bold mb-4 text-emerald-700">
          Why J'adoreivc?
        </h3>
        <p className="text-lg mb-6">
          Traveling is more than just visiting new places; it’s about connecting
          with the people who live there, understanding their way of life, and
          experiencing their culture firsthand. J'adoreivc stands out as the
          premier platform for those seeking to explore Côte d'Ivoire beyond the
          typical tourist attractions. Our guides are not just experts in their
          localities; they are storytellers, cultural ambassadors, and, above
          all, passionate individuals eager to share the beauty and richness of
          Ivorian culture with the world.
        </p>
        <h3 className="text-2xl font-bold mb-4 text-emerald-700">
          Supporting Local Economies
        </h3>
        <p className="text-lg mb-6">
          One of the core values at J'adoreivc is our commitment to boosting
          local economies. By partnering with local guides, we ensure that the
          economic benefits of tourism directly support the communities
          involved. This approach not only fosters sustainable development but
          also helps preserve the cultural heritage that makes Côte d'Ivoire a
          unique and vibrant destination.
        </p>
        <h3 className="text-2xl font-bold mb-4 text-emerald-700">
          Promoting Sustainable Tourism
        </h3>
        <p className="text-lg mb-6">
          Sustainability is at the forefront of everything we do. We recognize
          the importance of protecting the environments and cultures that make
          travel so enriching. J'adoreivc promotes sustainable tourism practices
          by encouraging responsible travel, supporting eco-friendly
          initiatives, and fostering a deep respect for the local cultures and
          environments our travelers explore.
        </p>
        <h3 className="text-2xl font-bold mb-4 text-emerald-700">
          Discover Côte d'Ivoire with Local Experts
        </h3>
        <p className="text-lg mb-6">
          Our platform offers a diverse range of tours and experiences, each led
          by a local guide who knows their area like the back of their hand.
          Whether you’re interested in exploring the bustling markets of
          Abidjan, hiking through the lush rainforests, or learning about the
          rich history and traditions of the Ivorian people, J'adoreivc has
          something for everyone.
        </p>
        <h3 className="text-2xl font-bold mb-4 text-emerald-700">
          Join the J'adoreivc Community
        </h3>
        <p className="text-lg mb-6">
          By choosing J'adoreivc, you become part of a community that values
          cultural exchange, responsible travel, and the empowerment of local
          communities. We invite you to explore our website, connect with our
          guides, and embark on a journey that will not only broaden your
          horizons but also contribute positively to the world.
        </p>
        <h2 className="text-3xl font-bold mb-4 text-emerald-700">
          Ready to Experience Côte d'Ivoire Like Never Before?
        </h2>
        <p className="text-lg mb-6 text-emerald-700">
          Browse our selection of tours and experiences today and start planning
          your next adventure in Côte d'Ivoire with J'adoreivc. Let’s make your
          travel meaningful, memorable, and truly extraordinary.
        </p>
      </div>
    </div>
  );
};

export default Page;
