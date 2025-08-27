import './App.css'
import React, { useState, useEffect, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Menu, X, Play, BookOpen, Megaphone, Star, Award, Users, ChevronRight, ArrowUp, Sun, Moon } from 'lucide-react'
import logoBlack from './assets/logo_black.png'
import logoWhite from './assets/logo_white.png'

// Theme Context
const ThemeContext = createContext()

// Theme Provider
const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={isDarkMode ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

// Scroll to top button component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 dark:bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 z-50 animate-bounce"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  )
}

// Header Component with enhanced animations and theme toggle
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isDarkMode, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl' 
        : 'bg-white dark:bg-gray-900 shadow-lg'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src={isDarkMode ? logoWhite : logoBlack} 
                alt="شعار الأكاديمية" 
                className="h-12 w-auto transition-all duration-300 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </div>
            <div className="text-right">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                أكاديمية الخط الإنجليزي
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                تعلم فن خط Engrosser
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="تبديل الوضع"
            >
              {isDarkMode ? (
                <Sun className="text-yellow-500" size={20} />
              ) : (
                <Moon className="text-gray-700" size={20} />
              )}
            </button>

            {/* Desktop Navigation with enhanced hover effects */}
            <nav className="hidden md:flex space-x-8 space-x-reverse">
              {[
                { to: "/", text: "الرئيسية" },
                { to: "/videos", text: "الفيديوهات التعليمية" },
                { to: "/gallery", text: "معرض الأعمال" },
                { to: "/announcements", text: "الإعلانات" }
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group px-3 py-2"
                >
                  {item.text}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button with animation */}
            <button
              className="md:hidden relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <Menu 
                  className={`absolute inset-0 transition-all duration-300 text-gray-700 dark:text-gray-300 ${
                    isMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'
                  }`} 
                  size={24} 
                />
                <X 
                  className={`absolute inset-0 transition-all duration-300 text-gray-700 dark:text-gray-300 ${
                    isMenuOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'
                  }`} 
                  size={24} 
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation with slide animation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="mt-4 pb-4 border-t dark:border-gray-700 pt-4">
            <div className="flex flex-col space-y-3 text-right">
              {[
                { to: "/", text: "الرئيسية" },
                { to: "/videos", text: "الفيديوهات التعليمية" },
                { to: "/gallery", text: "معرض الأعمال" },
                { to: "/announcements", text: "الإعلانات" }
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300 p-3 rounded-lg transform hover:translate-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

// Enhanced Home Page Component
const HomePage = () => {
  const [currentFeature, setCurrentFeature] = useState(0)
  const features = [
    {
      icon: Play,
      title: "فيديوهات تعليمية مجانية",
      description: "دروس مفصلة وواضحة تغطي جميع أساسيات خط Engrosser من البداية حتى الاحتراف",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: BookOpen,
      title: "معرض الأعمال",
      description: "استكشف مجموعة متنوعة من الأعمال الفنية المكتوبة بخط Engrosser الجميل",
      color: "text-green-600 dark:text-green-400"
    },
    {
      icon: Megaphone,
      title: "آخر الإعلانات",
      description: "كن أول من يعلم بالدورات الجديدة والورش التعليمية القادمة",
      color: "text-purple-600 dark:text-purple-400"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-20 overflow-hidden transition-colors duration-300">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <img 
              src={isDarkMode ? logoWhite : logoBlack} 
              alt="شعار الأكاديمية" 
              className="h-24 w-auto mx-auto mb-6 transition-all duration-300 transform hover:scale-110"
            />
            <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-6 leading-tight transition-colors duration-300">
              تعلم فن الخط الإنجليزي
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
              اكتشف جمال خط Engrosser وتعلم أساسياته من خلال دروسنا التعليمية المجانية. 
              رحلة إبداعية في عالم الخط الإنجليزي الكلاسيكي.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/videos"
                className="group bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 hover:shadow-xl"
              >
                <Play size={20} className="group-hover:animate-pulse" />
                ابدأ التعلم الآن
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/gallery"
                className="group bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 px-8 py-4 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-700 dark:hover:border-blue-300 transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 hover:shadow-xl"
              >
                <BookOpen size={20} className="group-hover:animate-bounce" />
                استكشف الأعمال
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-16 transition-colors duration-300">
            لماذا تختار أكاديميتنا؟
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div 
                  key={index}
                  className={`text-center p-8 rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 cursor-pointer bg-white dark:bg-gray-800 ${
                    currentFeature === index 
                      ? 'border-blue-500 dark:border-blue-400 shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-xl'
                  }`}
                  onMouseEnter={() => setCurrentFeature(index)}
                >
                  <div className="relative mb-6">
                    <Icon 
                      className={`mx-auto ${feature.color} transition-all duration-300 ${
                        currentFeature === index ? 'animate-bounce' : ''
                      }`} 
                      size={64} 
                    />
                    {currentFeature === index && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
                    )}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Users, number: "1000+", label: "طالب مسجل" },
              { icon: Play, number: "50+", label: "فيديو تعليمي" },
              { icon: Award, number: "95%", label: "معدل الرضا" }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="group">
                  <Icon className="mx-auto mb-4 group-hover:animate-bounce" size={48} />
                  <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-xl opacity-90">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced About Engrosser Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 transition-colors duration-300">
              عن خط Engrosser
            </h2>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl transition-colors duration-300">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
                خط Engrosser هو أسلوب خط أمريكي تم تطويره في أواخر القرن التاسع عشر. 
                يتميز بالدقة والحركات الدقيقة للقلم، ويتم إنشاؤه باستخدام قلم فولاذي مرن مدبب. 
                على الرغم من أنه يبدو خطًا متصلاً، إلا أنه يتكون في الواقع من العديد من رفعات القلم بين الضربات.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                كان هذا الخط شائعًا في أواخر القرن التاسع عشر وأوائل القرن العشرين، 
                ويعتبر من أجمل أنواع الخطوط الإنجليزية التي تتطلب مهارة عالية وصبرًا في التعلم.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Enhanced Videos Page Component
const VideosPage = () => {
  const videos = [
    {
      id: 1,
      title: "مقدمة في خط Engrosser",
      description: "تعرف على تاريخ وخصائص خط Engrosser الأساسية",
      thumbnail: "https://img.youtube.com/vi/4k5H6PXRcPU/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=4k5H6PXRcPU",
      duration: "15:30",
      level: "مبتدئ"
    },
    {
      id: 2,
      title: "أساسيات وضعية الورق والقلم",
      description: "تعلم الطريقة الصحيحة لمسك القلم ووضع الورق",
      thumbnail: "https://img.youtube.com/vi/VovdnXlWzPY/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=VovdnXlWzPY",
      duration: "12:45",
      level: "مبتدئ"
    },
    {
      id: 3,
      title: "كتابة الحروف الكبيرة X و Q",
      description: "دروس مفصلة لكتابة الحروف الكبيرة الصعبة",
      thumbnail: "https://via.placeholder.com/480x360/4F46E5/FFFFFF?text=حروف+كبيرة",
      url: "#",
      duration: "18:20",
      level: "متقدم"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
            الفيديوهات التعليمية
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
            تعلم خط Engrosser خطوة بخطوة مع دروسنا المفصلة
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div 
              key={video.id} 
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <Play className="text-white animate-pulse" size={48} />
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {video.duration}
                </div>
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {video.level}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-right group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-gray-800 dark:text-white">
                  {video.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-right leading-relaxed transition-colors duration-300">
                  {video.description}
                </p>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 inline-flex items-center gap-2 transform hover:scale-105"
                >
                  <Play size={16} />
                  مشاهدة الفيديو
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Enhanced Gallery Page Component
const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  
  const galleryItems = [
    {
      id: 1,
      title: "نموذج خط Engrosser كلاسيكي",
      image: "/src/assets/5uliiUVovzGD.jpg",
      description: "مثال على الخط الكلاسيكي بأسلوب Engrosser",
      category: "كلاسيكي"
    },
    {
      id: 2,
      title: "تطبيق عملي للحروف الكبيرة",
      image: "/src/assets/FGS4K6gVsu0B.jpg",
      description: "عرض للحروف الكبيرة المزخرفة",
      category: "حروف كبيرة"
    },
    {
      id: 3,
      title: "نص كامل بخط Engrosser",
      image: "/src/assets/xHDpbIpMWNoN.jpg",
      description: "نموذج لنص كامل مكتوب بخط Engrosser",
      category: "نصوص"
    },
    {
      id: 4,
      title: "تدريبات الحروف الصغيرة",
      image: "/src/assets/BuH0U5HxPm1m.jpg",
      description: "أمثلة على الحروف الصغيرة وتدريباتها",
      category: "حروف صغيرة"
    },
    {
      id: 5,
      title: "شهادة خط Engrosser",
      image: "/src/assets/czpVno21DIYv.jpg",
      description: "شهادة مكتوبة بخط Engrosser الأنيق",
      category: "شهادات"
    },
    {
      id: 6,
      title: "تمارين متقدمة",
      image: "/src/assets/aTpwIt5UJWJC.jpg",
      description: "تمارين متقدمة في خط Engrosser",
      category: "متقدم"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
            معرض الأعمال
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
            استكشف مجموعة رائعة من أعمال خط Engrosser
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-white text-center">
                    <BookOpen size={48} className="mx-auto mb-2 animate-pulse" />
                    <p className="text-lg font-semibold">عرض التفاصيل</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {item.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-right group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-right leading-relaxed transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for image preview */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl max-h-full overflow-auto transition-colors duration-300" onClick={(e) => e.stopPropagation()}>
              <div className="relative">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-300"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-right text-gray-800 dark:text-white transition-colors duration-300">{selectedImage.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-right transition-colors duration-300">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Enhanced Announcements Page Component
const AnnouncementsPage = () => {
  const announcements = [
    {
      id: 1,
      title: "دورة جديدة: أساسيات خط Engrosser",
      date: "2024-01-15",
      content: "نعلن عن بدء التسجيل في دورة أساسيات خط Engrosser للمبتدئين. الدورة تشمل 10 دروس تفاعلية مع تمارين عملية.",
      type: "course",
      featured: true
    },
    {
      id: 2,
      title: "ورشة عمل: تقنيات متقدمة في الخط",
      date: "2024-01-20",
      content: "ورشة عمل مكثفة لمدة يومين تغطي التقنيات المتقدمة في خط Engrosser والزخارف الفنية.",
      type: "workshop",
      featured: false
    },
    {
      id: 3,
      title: "مسابقة أجمل خط إنجليزي",
      date: "2024-02-01",
      content: "شارك في مسابقتنا الشهرية لأجمل خط إنجليزي واربح جوائز قيمة ومواد تعليمية مجانية.",
      type: "competition",
      featured: true
    }
  ]

  const getTypeColor = (type) => {
    switch (type) {
      case 'course': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700'
      case 'workshop': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700'
      case 'competition': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-700'
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600'
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'course': return 'دورة تدريبية'
      case 'workshop': return 'ورشة عمل'
      case 'competition': return 'مسابقة'
      default: return 'إعلان'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
            الإعلانات والأخبار
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
            ابق على اطلاع بآخر الأخبار والفعاليات
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-102 ${
                announcement.featured ? 'ring-2 ring-blue-500 dark:ring-blue-400 ring-opacity-50' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2 md:mb-0 text-right group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {announcement.title}
                  {announcement.featured && (
                    <Star className="inline-block mr-2 text-yellow-500" size={20} />
                  )}
                </h2>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-300 ${getTypeColor(announcement.type)}`}>
                    {getTypeLabel(announcement.type)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full transition-colors duration-300">
                    {new Date(announcement.date).toLocaleDateString('ar-EG')}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-right text-lg transition-colors duration-300">
                {announcement.content}
              </p>
              {announcement.featured && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                    اقرأ المزيد
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Enhanced Footer Component
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6 group">
            <div className="relative">
              <img 
                src={logoWhite} 
                alt="شعار الأكاديمية" 
                className="h-10 w-auto ml-3 group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </div>
            <h3 className="text-2xl font-semibold group-hover:text-blue-400 transition-colors duration-300">
              أكاديمية الخط الإنجليزي
            </h3>
          </div>
          <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-2xl mx-auto">
            تعلم فن الخط الإنجليزي وخط Engrosser مع أفضل الدروس التعليمية المجانية
          </p>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-400 text-sm">
              © 2024 أكاديمية الخط الإنجليزي. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/announcements" element={<AnnouncementsPage />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

