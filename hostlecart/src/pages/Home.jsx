import React from 'react';
import { Search, ThumbsUp, Star, ShoppingCart, Users, Package, Smile } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative px-4 py-20 overflow-hidden">
        {/* Floating Emojis */}
        <div className="absolute top-20 left-10 text-4xl animate-bounce">📚</div>
        <div className="absolute top-32 right-16 text-3xl animate-pulse">🚀</div>
        <div className="absolute bottom-40 left-20 text-3xl animate-spin">⚡</div>
        <div className="absolute bottom-20 right-32 text-4xl animate-bounce">🎯</div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">
            Hostel
            <span className="text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
              Cart
            </span>
            <span className="text-4xl ml-2">Kanpur</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Mess se thak gaye ho? Market door hai? <br />
            Yahin milenge saare jugaadu deals — <span className="text-purple-600 font-semibold">Buy</span>, <span className="text-pink-500 font-semibold">Sell</span>, aur <span className="text-blue-600 font-semibold">Chill</span> in Kanpuriya style 🎉
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-12">
            {[
              { label: "Kharido 📦", color: "from-green-400 to-emerald-500", href: "/products" },
              { label: "Becho 💰", color: "from-pink-500 to-red-500", href: "/sell" },
            ].map((btn, i) => (
              <a
                key={i}
                href={btn.href}
                className={`bg-gradient-to-r ${btn.color} text-white font-semibold py-3 px-6 rounded-xl hover:scale-105 transform transition-all duration-300 shadow-lg`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Hostel waale ❤️ HostelCart kyun?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          {[
            {
              icon: <Package className="mx-auto text-purple-500" size={32} />,
              title: 'Books & Notes',
              desc: 'Assignment se leke exam tak — sab kuch milta hai yahan 📖',
            },
            {
              icon: <ShoppingCart className="mx-auto text-green-500" size={32} />,
              title: 'Daily Essentials',
              desc: 'Bucket chahiye? Maggie gayi khatam? Toh yahin milta hai sab! 🍜🪣',
            },
            {
              icon: <Users className="mx-auto text-pink-500" size={32} />,
              title: 'Bhai-Chara Deals',
              desc: 'Hostel bhaiyon se direct deal — na koi middleman, na koi bakchodi 😎',
            },
          ].map((feature, idx) => (
            <div key={idx} className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 bg-gradient-to-r from-purple-100 to-pink-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Kaise Kaam Karta Hai? 🤔</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          {[
            { step: '1️⃣', title: 'Apna Profile Banao', desc: 'Apna naam, email aur hostel ka room number daalo.' },
            { step: '2️⃣', title: 'Cheezein Dalo ya Dhoondo', desc: 'Jo bechna hai daalo, jo chahiye wo dhoondo 🔍' },
            { step: '3️⃣', title: 'Deal Pakka Karo', desc: 'Mess ya lobby mein milo, aur deal done karo 🙌' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="text-4xl">{item.step}</div>
              <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 py-20 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-3xl mx-auto text-center bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Abhi tak join nahi kiya? Bhai kya kar rahe ho? 🤨
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Cheezein becho, mast doston se milo, aur hostel mein ek hero ban jao 💪
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/profile" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:scale-105 transition-all shadow-md">
              Apna Profile Dekho 🚀
            </a>
            <a href="/products" className="border-2 border-purple-400 text-purple-600 px-6 py-3 rounded-xl hover:bg-purple-50 hover:scale-105 transition-all shadow-md">
              Listings Browse Karo 👀
            </a>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
<section className="px-4 py-20 bg-white">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
      F.A.Q – Bhaiyon ke Sawal 🙋‍♂️
    </h2>

    <div className="space-y-4">
      {[
        {
          q: "Yeh HostelCart kya hai? 😶",
          a: "Bhai, yeh ek juggadu bazaar hai jahan tum apne hostel ke samaan bech sakte ho, ya dusron ka sasta maal le sakte ho. Ekdum paise vasool!"
        },
        {
          q: "Item post kaise karein? 🤔",
          a: "Bas ek form bharna hai, photo daalo, thoda swag likho aur post button dabao. Baaki kaam hum sambhalenge 😎"
        },
        {
          q: "Delivery kaun karega? 🛵",
          a: "Bhai yeh Swiggy nahi hai. Tumhe khud milke item lena/pahuchana padega. Masti bhi ho jaayegi 😄"
        },
        {
          q: "Agar buyer bhaag gaya toh? 😱",
          a: "Toh dosti toot gayi samjho! Isliye pehle chat karo, milo aur fir deal pakki karo. Apun hostel wale hain, trust toh hona chahiye!"
        },
        {
          q: "Kya yeh free hai? 🤑",
          a: "Bilkul free! Na subscription, na hidden charges. Sirf pyaar aur thoda sa hostel ka jugaad."
        },
      ].map((item, idx) => (
        <details key={idx} className="group bg-purple-50 border border-purple-200 p-5 rounded-xl shadow hover:shadow-md transition-all duration-300">
          <summary className="flex justify-between items-center cursor-pointer font-medium text-purple-700 group-open:text-purple-900 text-lg">
            <span>{item.q}</span>
            <span className="text-purple-500 group-open:rotate-180 transition-transform duration-300">▼</span>
          </summary>
          <p className="text-gray-700 mt-3">{item.a}</p>
        </details>
      ))}
    </div>
  </div>
</section>


    </div>
  );
};

export default Home;
