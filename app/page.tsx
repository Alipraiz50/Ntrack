"use client"
import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Truck, MapPin, BarChart3, Users, Menu, X, Moon, Sun, Clock, Globe, ArrowRight, PlayCircle, ClipboardList, SatelliteDish, BadgeCheck, Twitter, Linkedin, Facebook } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const gradientButton =
  "relative overflow-hidden rounded-lg px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 " +
  "before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 " +
  "before:animate-[gradientShift_4s_ease_infinite] before:-z-10 hover:scale-[1.05] active:scale-[0.97]";

const glassButton =
  "backdrop-blur-xl bg-white/10 border border-white/20 text-white shadow-lg rounded-lg px-6 py-3 transition hover:bg-white/20";

const glassCard =
  "backdrop-blur-2xl bg-white/10 dark:bg-white/5 border border-white/20 shadow-xl shadow-black/30 rounded-2xl";

// ------------------- THREE.JS HERO BACKGROUND -------------------
const HeroBackground: React.FC = () => {
  const meshRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
    }
  });

  const points = [];
  const count = 500;
  for (let i = 0; i < count; i++) {
    const x = THREE.MathUtils.randFloatSpread(20);
    const y = THREE.MathUtils.randFloatSpread(10);
    const z = THREE.MathUtils.randFloatSpread(20);
    points.push(new THREE.Vector3(x, y, z));
  }

  return (
    <points ref={meshRef}>
      <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints(points)} />
      <pointsMaterial attach="material" color="#6b5bff" size={0.1} sizeAttenuation />
    </points>
  );
};

// ------------------- MAIN COMPONENT -------------------
const NTrackLanding: React.FC = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Initial hero animations
    gsap.from('.gsap-hero', { opacity: 0, y: 60, duration: 1 });
    gsap.from('.gsap-hero-img', { opacity: 0, x: 60, duration: 1, delay: 0.3 });

    // Float hero text
    gsap.to('.floaty', { y: -10, duration: 2.5, repeat: -1, yoyo: true });

    // Hero image moves further to right
    gsap.to('.hero-img-move', { x: 60, duration: 2, repeat: -1, yoyo: true, ease: "power1.inOut" });

    // Scroll-triggered animations for sections
    gsap.utils.toArray('.gsap-section').forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 60%",
          toggleActions: "play none none none",
        }
      });
    });

  }, []);

  const steps = [
    { number: '01', title: 'Book Your Delivery', description: 'Schedule pickups and deliveries in seconds with our intuitive booking system', icon: <ClipboardList /> },
    { number: '02', title: 'Track in Real-Time', description: 'Monitor every shipment with live GPS tracking and instant updates', icon: <SatelliteDish /> },
    { number: '03', title: 'Deliver & Confirm', description: 'Get digital proof of delivery with photos and signatures', icon: <BadgeCheck /> }
  ];

  const features = [
    { icon: <MapPin />, title: 'Real-Time GPS Tracking', description: 'Monitor your entire fleet with live location updates.' },
    { icon: <BarChart3 />, title: 'Advanced Analytics', description: 'Get detailed insights on delivery times and efficiency.' },
    { icon: <Truck />, title: 'Fleet Management', description: 'Manage unlimited vehicles from one dashboard.' },
    { icon: <Users />, title: 'Driver Performance', description: 'Track driver behavior and boost efficiency.' }
  ];

  const stats = [
    { value: '15K+', label: 'Active Users', icon: <Users /> },
    { value: '98%', label: 'On-Time Delivery', icon: <Clock /> },
    { value: '50K+', label: 'Monthly Deliveries', icon: <Truck /> },
    { value: '45+', label: 'Cities Covered', icon: <Globe /> }
  ];

  const toggleTheme = () => setDarkMode((d) => !d);

  const bgColor = darkMode ? 'bg-gray-950' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const secondaryText = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-500`}
    >

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-30 bg-white/30 dark:bg-black/50 border-b border-white/20 shadow-lg backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between w-full">
          <img src="/logo.png" alt="N-Track" className="h-10 sm:h-12 w-10 sm:w-12 drop-shadow-lg" />
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-sm">
            <a href="#features" className="hover:text-blue-400 transition">Features</a>
            <a href="#how-it-works" className="hover:text-blue-400 transition">How It Works</a>
            <a href="#testimonials" className="hover:text-blue-400 transition">Testimonials</a>
            <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          <div className="md:hidden flex items-center gap-2 sm:gap-3 ml-auto">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-4 pb-4 bg-white/30 dark:bg-black/50 backdrop-blur-sm border-t border-white/20"
          >
            <a href="#features" className="block py-3 hover:text-blue-400 transition" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="block py-3 hover:text-blue-400 transition" onClick={() => setIsMenuOpen(false)}>How It Works</a>
            <a href="#testimonials" className="block py-3 hover:text-blue-400 transition" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
            <a href="#contact" className="block py-3 hover:text-blue-400 transition" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </motion.div>
        )}
      </nav>

      <main className="pt-20 sm:pt-24 md:pt-28">

        {/* HERO */}
        <motion.section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative">

          {/* Three.js Background */}
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
              <Suspense fallback={null}>
                <HeroBackground />
              </Suspense>
            </Canvas>
          </div>

          <motion.div className="gsap-hero relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight floaty">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Smarter Logistics,</span><br />
              <span className={`text-gray-400`}>Seamless Delivery.</span>
            </h1>

            <p className={`mt-4 text-sm sm:text-base md:text-lg ${secondaryText}`}>
              N-Track connects businesses, drivers, and customers on one platform with real-time tracking, analytics, and optimized deliveries.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.a href="/" whileHover={{ scale: 1.05 }} className={gradientButton + " text-center text-sm sm:text-base"}>
                Launch Platform <ArrowRight className="inline ml-2" size={18} />
              </motion.a>

              <motion.a href="#how-it-works" whileHover={{ scale: 1.05 }} className={gradientButton + " flex items-center gap-2 justify-center text-sm sm:text-base"}>
                <PlayCircle className="text-white" size={18} /> Watch Demo
              </motion.a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-10">
              {stats.map((s, i) => (
                <motion.div key={i} className={`${glassCard} p-3 sm:p-4 rounded-xl text-center hover:scale-[1.06] transition`}>
                  <div className="font-bold text-xl sm:text-2xl">{s.value}</div>
                  <div className={`text-xs sm:text-sm ${secondaryText}`}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="gsap-hero-img relative z-10 flex justify-center items-center lg:justify-end">
            <img src="/2.png" alt="mock" className="rounded-3xl shadow-lg w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-lg mx-auto lg:mx-0" />
          </motion.div>
        </motion.section>

        {/* HOW IT WORKS */}
        <motion.section id="how-it-works" className={`py-16 sm:py-20 gsap-section ${darkMode ? 'bg-gray-900/40' : 'bg-gray-100'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">How It Works</h2>
            <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {steps.map((step) => (
                <div key={step.number} className={`${glassCard} p-5 sm:p-6 rounded-xl flex flex-col items-center text-center hover:scale-[1.08] transition cursor-pointer`}>
                  <div className="p-3 sm:p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-3 shadow-lg">{step.icon}</div>
                  <div className="text-xs sm:text-sm font-bold text-blue-400">{step.number}</div>
                  <h3 className="mt-2 sm:mt-3 font-semibold text-base sm:text-lg">{step.title}</h3>
                  <p className={`mt-2 text-sm ${secondaryText}`}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* FEATURES */}
        <motion.section id="features" className={`py-16 sm:py-20 gsap-section`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Powerful Features</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {features.map((feat, i) => (
                <div key={i} className={`${glassCard} p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-4 hover:scale-[1.06] transition`}>
                  <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">{feat.icon}</div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-base sm:text-lg">{feat.title}</h3>
                    <p className={`text-sm ${secondaryText} mt-1`}>{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* TESTIMONIALS */}
        <motion.section className={`py-16 sm:py-20 ${darkMode ? 'bg-gray-900/40' : 'bg-white'} gsap-section relative`}>
          {/* Three.js Background */}
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
              <Suspense fallback={null}>
                <HeroBackground />
              </Suspense>
            </Canvas>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`${glassCard} p-6 sm:p-8 rounded-2xl text-center hover:scale-[1.05] transition`}>
                  <p className="italic mb-4 text-sm sm:text-base">{[
                    '"N-Track made our logistics seamless and stress-free. Highly recommended!"',
                    '"The analytics dashboard is a game changer for our business operations."',
                    '"Real-time tracking and instant updates keep our customers happy!"'
                  ][i]}</p>
                  <div className="font-semibold text-sm sm:text-base">{['Blessing Adeyemi', 'Emeka Uzochukwu', 'Fatima Bello'][i]}</div>
                  <div className="text-xs text-gray-400 mt-1">{[
                    'Logistics Manager, SwiftMove Ltd.',
                    'Head of Operations, CargoPro Inc.',
                    'Customer Service Lead, ExpressGo'
                  ][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section className="py-16 sm:py-20 gsap-section relative">
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
              <Suspense fallback={null}>
                <HeroBackground />
              </Suspense>
            </Canvas>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Ready to Transform</span><br />
                <span className={`text-gray-400`}>Your Logistics?</span>
              </h2>
              <p className="mb-6 sm:mb-8 text-base sm:text-lg md:text-xl text-gray-300">
                Join hundreds of enterprises optimizing their supply chain with N-Track.
              </p>
              <motion.a whileHover={{ scale: 1.05 }} href="/" className={gradientButton + " text-base sm:text-lg font-semibold inline-flex items-center gap-2"}>
                Launch Platform <ArrowRight />
              </motion.a>
            </div>
            <div className="flex justify-center md:justify-end mt-8 md:mt-0">
              <img src="/4.png" alt="Transform Logistics" className="rounded-3xl shadow-2xl w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md h-auto" />
            </div>
          </div>
        </motion.section>

        {/* FOOTER */}
        <motion.footer
          className={`py-8 sm:py-10 gsap-footer backdrop-blur-xl bg-white/10 border-t border-white/20`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 flex flex-col gap-8 sm:gap-10">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <img src="/logo.png" alt="N-Track" className="h-8 sm:h-10 w-10" />
              <div className="flex gap-4 sm:gap-6">
                <Twitter size={20} className="cursor-pointer hover:text-blue-400 transition" />
                <Linkedin size={20} className="cursor-pointer hover:text-blue-400 transition" />
                <Facebook size={20} className="cursor-pointer hover:text-blue-400 transition" />
              </div>
            </div>

            <p className="text-center text-xs sm:text-sm text-gray-400">&copy; 2025 N-Track. All rights reserved.</p>
          </div>
        </motion.footer>

      </main>
    </motion.div>
 

  );
};

export default NTrackLanding;