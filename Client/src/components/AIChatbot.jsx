// client/src/components/AIChatbot.jsx
import React, { useState, useRef, useEffect } from "react";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI Business Assistant. I can provide real-time company information, stock data, news, and more. Which company would you like to know about?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState(null);
  const [language, setLanguage] = useState("english"); 
  const [quickActions, setQuickActions] = useState([
    { label: "EAPL Time", query: ".timing in this company" },
    { label: "EAPL CEO", query: "EAPL CEO information" },
    { label: "EAPL Products", query: "EAPL products and services" },
    { label: "EAPL Stock", query: "EAPL stock price today" },
    { label: "GOOGL CEO", query: "Google CEO information" },
    { label: "MSFT Revenue", query: "Microsoft revenue 2024" },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const companiesData = {
    
    eapl: {
      symbol: "EAPL",
      name: "EAPL Technologies Ltd.",
      fullName: "Employee Assistance & Productivity Ltd.",
      description: `EAPL (Employee Assistance & Productivity Ltd.) is a leading enterprise software company specializing in employee management, productivity tools, and AI-powered business solutions. We provide comprehensive HR management systems, performance tracking, and enterprise resource planning solutions to businesses worldwide. Our mission is to empower organizations with intelligent tools that enhance productivity and employee satisfaction.`,
      ceo: "MD. Rahman",
      founded: "January 15, 2020",
      founders: ["MD. Rahman", "Sarah Ahmed", "James Wilson"],
      headquarters: {
        address: "Tech Park Tower, Floor 12",
        city: "Dhaka",
        state: "Dhaka Division",
        country: "Bangladesh",
        zipCode: "1212",
      },
      employees: "250+ (2024)",
      industry: "Enterprise Software, SaaS, AI Solutions",
      sector: "Technology",
      website: "https://eapl.com",
      marketCap: "$150 Million",
      revenue: "$25 Million (2023)",
      netIncome: "$5.2 Million (2023)",
      eps: "$0.85",
      peRatio: "28.8",
      dividendYield: "1.2%",
      stockPrice: "$24.50",
      stockChange: "+3.25%",
      dayRange: "$23.80 - $25.20",
      yearRange: "$18.50 - $26.75",
      volume: "1,245,300",
      avgVolume: "890,500",
      marketCapRank: "Emerging",
      keyProducts: [
        "EAPL HR Suite",
        "Productivity Pro",
        "AI Business Assistant",
        "Enterprise Dashboard",
        "Performance Tracker",
        "Attendance System",
        "Payroll Management",
        "Employee Wellness Platform",
      ],
      competitors: [
        "SAP",
        "Oracle",
        "Workday",
        "BambooHR",
        "Zoho",
        "Monday.com",
      ],
      subsidiaries: ["EAPL AI Labs", "Productivity Cloud", "Tech Solutions BD"],
      recentMilestones: [
        { year: "2024", event: "Launched AI Business Assistant" },
        { year: "2023", event: "Expanded to 15+ countries" },
        { year: "2023", event: "Reached 500+ enterprise clients" },
        { year: "2022", event: "Secured Series B funding $10M" },
        { year: "2021", event: "Awarded 'Best HR Tech Solution'" },
        { year: "2020", event: "Company founded with initial team of 10" },
      ],
      financialHighlights: {
        2023: { revenue: "25M", profit: "5.2M" },
        2022: { revenue: "18M", profit: "3.5M" },
        2021: { revenue: "12M", profit: "2.1M" },
        2020: { revenue: "5M", profit: "0.8M" },
      },
      leadership: [
        { name: "MD. Rahman", position: "CEO & Founder", since: "2020" },
        { name: "Sarah Ahmed", position: "CTO", since: "2020" },
        { name: "James Wilson", position: "CFO", since: "2021" },
        { name: "Lisa Chen", position: "Head of Product", since: "2021" },
        { name: "David Kim", position: "Head of AI Research", since: "2022" },
        { name: "Maria Garcia", position: "Head of Sales", since: "2021" },
      ],
      news: [
        {
          title: "EAPL launches revolutionary AI Business Assistant",
          source: "TechCrunch",
          date: "2024-01-15",
          summary:
            "New AI tool helps businesses make data-driven decisions with real-time analytics",
        },
        {
          title: "EAPL expands operations to Southeast Asia",
          source: "Business Today",
          date: "2024-01-14",
          summary:
            "Company opens new offices in Singapore and Malaysia to serve growing APAC market",
        },
        {
          title: "EAPL reports 40% revenue growth in Q4 2023",
          source: "Financial Express",
          date: "2024-01-12",
          summary:
            "Strong performance driven by enterprise clients adopting AI solutions",
        },
        {
          title: "EAPL partners with leading universities for AI research",
          source: "AI Weekly",
          date: "2024-01-10",
          summary:
            "Collaboration with MIT and Stanford for advanced AI algorithms development",
        },
      ],
      analystRatings: {
        buy: 8,
        hold: 2,
        sell: 0,
        averageTarget: "$28.50",
        highTarget: "$35.00",
        lowTarget: "$22.00",
      },
      sustainability: {
        carbonNeutral: "2025 Target",
        renewableEnergy: "75% for operations",
        employeeSatisfaction: "4.8/5.0",
        communityProjects: "10+ active initiatives",
        rating: "A (GreenTech Rating)",
      },
      companyValues: [
        "Innovation First",
        "Employee Empowerment",
        "Customer Success",
        "Data Privacy & Security",
        "Sustainable Growth",
        "Global Impact",
      ],
      clients: [
        "Fortune 500 Companies",
        "Government Agencies",
        "Educational Institutions",
        "Healthcare Providers",
        "Startups & SMEs",
        "Financial Institutions",
      ],
      awards: [
        "Best HR Tech Solution 2023",
        "Innovation Award - AI Category",
        "Top Employer - Bangladesh 2022",
        "Green Business Certification",
      ],
    },

   
    apple: {
      symbol: "AAPL",
      name: "Apple Inc.",
      fullName: "Apple Inc.",
      description: `Apple Inc. is an American multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services. The company's most popular hardware products include the iPhone smartphone, Mac computers, iPad tablets, Apple Watch smartwatch, and Apple TV.`,
      ceo: "Tim Cook",
      founded: "April 1, 1976",
      founders: ["Steve Jobs", "Steve Wozniak", "Ronald Wayne"],
      headquarters: {
        address: "One Apple Park Way",
        city: "Cupertino",
        state: "California",
        country: "United States",
        zipCode: "95014",
      },
      employees: "164,000+ (2023)",
      industry: "Consumer Electronics, Software, Online Services",
      sector: "Technology",
      website: "https://www.apple.com",
      marketCap: "$2.9 Trillion",
      revenue: "$383.29 Billion (2023)",
      netIncome: "$97.0 Billion (2023)",
      eps: "$6.13",
      peRatio: "28.15",
      dividendYield: "0.55%",
      stockPrice: "$172.50",
      stockChange: "+1.24%",
      dayRange: "$170.50 - $173.20",
      yearRange: "$124.17 - $198.23",
      volume: "55,843,122",
      avgVolume: "58,234,100",
      marketCapRank: "1",
      keyProducts: [
        "iPhone",
        "Mac",
        "iPad",
        "Apple Watch",
        "AirPods",
        "Apple TV",
        "Services (App Store, Apple Music, iCloud, Apple Pay)",
      ],
      competitors: [
        "Microsoft",
        "Google (Alphabet)",
        "Samsung",
        "Amazon",
        "Meta",
      ],
      subsidiaries: [
        "Beats Electronics",
        "Shazam",
        "Intel Modem Business",
        "Drive.ai",
      ],
      recentMilestones: [
        { year: "2023", event: "Launched iPhone 15 series with USB-C" },
        { year: "2023", event: "Vision Pro mixed reality headset announced" },
        { year: "2022", event: "Became first $3 trillion company" },
        { year: "2021", event: "Launched M1 chip for Mac" },
        { year: "2020", event: "Transitioned to Apple Silicon" },
      ],
      financialHighlights: {
        2023: { revenue: "383.29B", profit: "97.0B" },
        2022: { revenue: "394.33B", profit: "99.8B" },
        2021: { revenue: "365.82B", profit: "94.68B" },
        2020: { revenue: "274.52B", profit: "57.41B" },
        2019: { revenue: "260.17B", profit: "55.26B" },
      },
      leadership: [
        { name: "Tim Cook", position: "CEO", since: "2011" },
        { name: "Jeff Williams", position: "COO", since: "2015" },
        { name: "Luca Maestri", position: "CFO", since: "2014" },
        { name: "Katherine Adams", position: "General Counsel", since: "2017" },
        { name: "Eddy Cue", position: "SVP of Services", since: "2011" },
      ],
      news: [
        {
          title: "Apple unveils new AI features for iPhone",
          source: "Reuters",
          date: "2024-01-15",
          summary:
            "Apple announces major AI integration in upcoming iOS updates",
        },
        {
          title: "iPhone 15 sales exceed expectations in Q4",
          source: "Bloomberg",
          date: "2024-01-14",
          summary: "Strong holiday sales despite global economic challenges",
        },
        {
          title: "Apple Vision Pro pre-orders begin",
          source: "CNBC",
          date: "2024-01-12",
          summary: "Mixed reality headset available for pre-order at $3,499",
        },
      ],
      analystRatings: {
        buy: 35,
        hold: 10,
        sell: 2,
        averageTarget: "$195.50",
        highTarget: "$240.00",
        lowTarget: "$120.00",
      },
      sustainability: {
        carbonNeutral: "2030 Target",
        renewableEnergy: "100% for corporate operations",
        recycling: "Daisy robot for iPhone disassembly",
        rating: "AA (MSCI ESG)",
      },
    },
    google: {
      symbol: "GOOGL",
      name: "Alphabet Inc. (Google)",
      fullName: "Alphabet Inc.",
      description: `Alphabet Inc. is an American multinational technology conglomerate holding company created through a corporate restructuring of Google on October 2, 2015. It is the parent company of Google and several former Google subsidiaries.`,
      ceo: "Sundar Pichai",
      founded: "October 2, 2015 (Google: September 4, 1998)",
      founders: ["Larry Page", "Sergey Brin"],
      headquarters: {
        address: "1600 Amphitheatre Parkway",
        city: "Mountain View",
        state: "California",
        country: "United States",
        zipCode: "94043",
      },
      employees: "182,500+ (2023)",
      industry: "Internet, Cloud Computing, Software, AI",
      sector: "Technology",
      website: "https://abc.xyz",
      marketCap: "$1.8 Trillion",
      revenue: "$307.39 Billion (2023)",
      netIncome: "$73.8 Billion (2023)",
      eps: "$5.80",
      peRatio: "25.47",
      dividendYield: "N/A",
      stockPrice: "$152.75",
      stockChange: "+0.89%",
      dayRange: "$151.20 - $153.80",
      yearRange: "$88.34 - $155.20",
      volume: "32,456,789",
      avgVolume: "30,123,456",
      marketCapRank: "4",
      keyProducts: [
        "Google Search",
        "YouTube",
        "Google Cloud",
        "Android OS",
        "Google Ads",
        "Google Workspace",
        "Google AI (Gemini)",
      ],
      competitors: ["Microsoft", "Amazon", "Meta", "Apple", "Baidu"],
      subsidiaries: ["YouTube", "Waymo", "Verily", "DeepMind", "Fitbit"],
      recentMilestones: [
        { year: "2023", event: "Launched Gemini AI model" },
        { year: "2022", event: "AI chatbot Bard announced" },
        { year: "2021", event: "Record $257 billion revenue" },
        { year: "2020", event: "Google Cloud profitability achieved" },
        { year: "2019", event: "Quantum supremacy claimed" },
      ],
      financialHighlights: {
        2023: { revenue: "307.39B", profit: "73.8B" },
        2022: { revenue: "282.84B", profit: "59.97B" },
        2021: { revenue: "257.64B", profit: "76.03B" },
        2020: { revenue: "182.53B", profit: "40.27B" },
        2019: { revenue: "161.86B", profit: "34.34B" },
      },
      leadership: [
        { name: "Sundar Pichai", position: "CEO", since: "2019" },
        { name: "Ruth Porat", position: "CFO", since: "2015" },
        {
          name: "Philipp Schindler",
          position: "Chief Business Officer",
          since: "2015",
        },
        {
          name: "Thomas Kurian",
          position: "CEO of Google Cloud",
          since: "2019",
        },
        { name: "Demis Hassabis", position: "CEO of DeepMind", since: "2010" },
      ],
      news: [
        {
          title: "Google announces Gemini Ultra AI model",
          source: "TechCrunch",
          date: "2024-01-15",
          summary: "New AI model outperforms GPT-4 in multiple benchmarks",
        },
        {
          title: "Google Cloud shows strongest growth",
          source: "Forbes",
          date: "2024-01-14",
          summary: "Cloud division revenue up 25% year-over-year",
        },
        {
          title: "YouTube reaches 2.7 billion monthly users",
          source: "WSJ",
          date: "2024-01-13",
          summary: "Video platform continues to dominate online video",
        },
      ],
      analystRatings: {
        buy: 42,
        hold: 8,
        sell: 1,
        averageTarget: "$165.80",
        highTarget: "$185.00",
        lowTarget: "$135.00",
      },
    },
    microsoft: {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      fullName: "Microsoft Corporation",
      description: `Microsoft Corporation is an American multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.`,
      ceo: "Satya Nadella",
      founded: "April 4, 1975",
      founders: ["Bill Gates", "Paul Allen"],
      headquarters: {
        address: "One Microsoft Way",
        city: "Redmond",
        state: "Washington",
        country: "United States",
        zipCode: "98052",
      },
      employees: "221,000+ (2023)",
      industry: "Software, Cloud Computing, Hardware",
      sector: "Technology",
      website: "https://www.microsoft.com",
      marketCap: "$3.0 Trillion",
      revenue: "$211.9 Billion (2023)",
      netIncome: "$72.4 Billion (2023)",
      eps: "$9.68",
      peRatio: "37.82",
      dividendYield: "0.73%",
      stockPrice: "$404.87",
      stockChange: "+2.15%",
      dayRange: "$401.50 - $406.20",
      yearRange: "$242.10 - $407.80",
      volume: "28,456,123",
      avgVolume: "26,789,012",
      marketCapRank: "2",
      keyProducts: [
        "Windows OS",
        "Microsoft 365",
        "Azure Cloud",
        "LinkedIn",
        "Xbox",
        "Dynamics 365",
        "GitHub",
      ],
      competitors: ["Amazon", "Google", "Oracle", "Salesforce", "Apple"],
      subsidiaries: [
        "LinkedIn",
        "GitHub",
        "Nuance Communications",
        "Activision Blizzard",
        "Skype",
      ],
      recentMilestones: [
        {
          year: "2023",
          event: "Completed $69B Activision Blizzard acquisition",
        },
        { year: "2023", event: "Launched Copilot AI assistant" },
        {
          year: "2022",
          event: "Azure revenue surpassed $100B annual run rate",
        },
        { year: "2021", event: "Windows 11 launched" },
        { year: "2020", event: "Teams reached 115 million daily users" },
      ],
      financialHighlights: {
        2023: { revenue: "211.9B", profit: "72.4B" },
        2022: { revenue: "198.3B", profit: "72.7B" },
        2021: { revenue: "168.1B", profit: "61.3B" },
        2020: { revenue: "143.0B", profit: "44.3B" },
        2019: { revenue: "125.8B", profit: "39.2B" },
      },
      leadership: [
        { name: "Satya Nadella", position: "Chairman & CEO", since: "2014" },
        { name: "Amy Hood", position: "CFO", since: "2013" },
        { name: "Brad Smith", position: "President", since: "2015" },
        { name: "Judson Althoff", position: "EVP Commercial", since: "2016" },
        { name: "Chris Capossela", position: "CMO", since: "2014" },
      ],
      news: [
        {
          title: "Microsoft Copilot now available for enterprise",
          source: "CNBC",
          date: "2024-01-15",
          summary: "AI assistant integrated across Microsoft 365 products",
        },
        {
          title: "Azure growth continues to accelerate",
          source: "Financial Times",
          date: "2024-01-14",
          summary: "Cloud computing division growing at 29% year-over-year",
        },
        {
          title: "Windows 12 expected in 2024",
          source: "The Verge",
          date: "2024-01-13",
          summary: "Next-generation Windows to feature AI integration",
        },
      ],
      analystRatings: {
        buy: 48,
        hold: 6,
        sell: 0,
        averageTarget: "$425.50",
        highTarget: "$450.00",
        lowTarget: "$380.00",
      },
    },
  };

  const fetchCompanyInfo = async (query) => {
    setLoading(true);

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: query,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Normalize and identify company
    const normalizedQuery = query.toLowerCase();
    let matchedCompany = null;
    let companyKey = null;

    // Check for company matches
    for (const [key, company] of Object.entries(companiesData)) {
      const companyKeywords = [
        key,
        company.symbol.toLowerCase(),
        company.name.toLowerCase(),
        ...company.name.toLowerCase().split(" "),
        ...(company.fullName?.toLowerCase().split(" ") || []),
      ];

      if (
        companyKeywords.some(
          (keyword) => normalizedQuery.includes(keyword) && keyword.length > 2
        )
      ) {
        matchedCompany = company;
        companyKey = key;
        break;
      }
    }

    if (matchedCompany) {
      setCompanyData(matchedCompany);

      // Determine what specific info user wants
      let responseText = "";
      const company = matchedCompany;

      if (
        normalizedQuery.includes("stock") ||
        normalizedQuery.includes("price") ||
        normalizedQuery.includes("quote")
      ) {
        responseText = `📈 **${company.name} (${
          company.symbol
        }) Stock Information:**
        
• **Current Price:** ${company.stockPrice}
• **Today's Change:** ${company.stockChange}
• **Day Range:** ${company.dayRange}
• **52-Week Range:** ${company.yearRange}
• **Volume:** ${company.volume.toLocaleString()}
• **Avg Volume:** ${company.avgVolume.toLocaleString()}
• **P/E Ratio:** ${company.peRatio}
• **Market Cap:** ${company.marketCap}
• **Dividend Yield:** ${company.dividendYield}

**Analyst Target Price:** ${company.analystRatings?.averageTarget || "N/A"}
**Buy Ratings:** ${company.analystRatings?.buy || "N/A"} | **Hold:** ${
          company.analystRatings?.hold || "N/A"
        } | **Sell:** ${company.analystRatings?.sell || "N/A"}`;
      } else if (
        normalizedQuery.includes("ceo") ||
        normalizedQuery.includes("leadership") ||
        normalizedQuery.includes("executive")
      ) {
        responseText = `👨‍💼 **${company.name} Leadership Team:**
        
${company.leadership
  .slice(0, 5)
  .map(
    (leader) =>
      `• **${leader.position}:** ${leader.name} (Since ${leader.since})`
  )
  .join("\n")}

${company.founders ? `**Founders:** ${company.founders.join(", ")}` : ""}`;
      } else if (
        normalizedQuery.includes("revenue") ||
        normalizedQuery.includes("financial") ||
        normalizedQuery.includes("income") ||
        normalizedQuery.includes("profit")
      ) {
        responseText = `💰 **${company.name} Financial Highlights:**
        
• **Annual Revenue (2023):** ${company.revenue}
• **Net Income (2023):** ${company.netIncome}
• **Earnings Per Share (EPS):** ${company.eps}
• **Market Capitalization:** ${company.marketCap}

**Revenue Trend (Last 5 Years):**
${Object.entries(company.financialHighlights || {})
  .map(
    ([year, data]) =>
      `• **${year}:** Revenue: ${data.revenue}, Profit: ${data.profit}`
  )
  .join("\n")}`;
      } else if (
        normalizedQuery.includes("product") ||
        normalizedQuery.includes("service") ||
        normalizedQuery.includes("business")
      ) {
        responseText = `📱 **${company.name} Products & Services:**
        
**Main Product Lines:**
${company.keyProducts.map((product, index) => `• ${product}`).join("\n")}

${
  company.subsidiaries?.length > 0
    ? `**Major Subsidiaries:**\n${company.subsidiaries
        .slice(0, 5)
        .map((sub) => `• ${sub}`)
        .join("\n")}`
    : ""
}

${
  company.competitors?.length > 0
    ? `**Competitors:** ${company.competitors.slice(0, 3).join(", ")}`
    : ""
}`;
      } else if (
        normalizedQuery.includes("news") ||
        normalizedQuery.includes("update") ||
        normalizedQuery.includes("latest")
      ) {
        responseText = `📰 **Latest ${company.name} News:**
        
${(company.news || [])
  .slice(0, 3)
  .map(
    (item, index) =>
      `• **${item.title}** (${item.source}, ${item.date})
  ${item.summary}`
  )
  .join("\n\n")}`;
      } else if (
        normalizedQuery.includes("about") ||
        normalizedQuery.includes("info") ||
        normalizedQuery.includes("description")
      ) {
        responseText = `🏢 **${company.name} (${
          company.symbol
        }) - Company Overview**

**Basic Information:**
• **Founded:** ${company.founded}
• **Founders:** ${company.founders?.join(", ") || "N/A"}
• **Headquarters:** ${company.headquarters.address}, ${
          company.headquarters.city
        }, ${company.headquarters.state}
• **CEO:** ${company.ceo}
• **Employees:** ${company.employees}
• **Industry:** ${company.industry}
• **Sector:** ${company.sector}
• **Website:** ${company.website}

**Financial Information:**
• **Market Cap:** ${company.marketCap}
• **Annual Revenue:** ${company.revenue}
• **Net Income:** ${company.netIncome}
• **Stock Price:** ${company.stockPrice} (${company.stockChange})

**Key Products:** ${company.keyProducts.slice(0, 5).join(", ")}

Ask me specific questions:
• "${company.symbol} stock price"
• "${company.name.split(" ")[0]} CEO"
• "${company.name.split(" ")[0]} revenue 2023"
• "${company.name.split(" ")[0]} products"
• "${company.name.split(" ")[0]} latest news"`;
      } else {
        // General company info
        responseText = `🏢 **${company.name} (${company.symbol})**

${company.description}

**Quick Facts:**
• **CEO:** ${company.ceo}
• **Headquarters:** ${company.headquarters.city}, ${company.headquarters.state}
• **Market Cap:** ${company.marketCap} (#${company.marketCapRank} globally)
• **Current Stock:** ${company.stockPrice} (${company.stockChange})

**What would you like to know about ${company.name.split(" ")[0]}?**
• Stock information
• Leadership team
• Financial performance
• Products & services
• Latest news`;
      }

      const aiMessage = {
        id: messages.length + 2,
        text: responseText,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } else {
      // No company matched
      const aiMessage = {
        id: messages.length + 2,
        text: `I received your query about "${query}". Currently, I have detailed information about the following companies:

**Available Companies:**
• **EAPL Technologies (EAPL)** - Enterprise Software, AI Solutions
• **Apple (AAPL)** - Technology, Consumer Electronics
• **Google/Alphabet (GOOGL)** - Internet, AI, Cloud Computing
• **Microsoft (MSFT)** - Software, Cloud Computing

Please ask about any of these companies, or use the quick action buttons below for specific information.`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }

    setLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    await fetchCompanyInfo(input);
    setInput("");
  };

  const handleQuickAction = (query) => {
    setInput(query);
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "bangla" : "english");
  };

  const renderCompanySummary = () => {
    if (!companyData) return null;

    return (
      <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 bg-gradient-to-r ${
                companyData.symbol === "EAPL"
                  ? "from-purple-600 to-pink-600"
                  : companyData.symbol === "AAPL"
                  ? "from-gray-800 to-gray-900"
                  : companyData.symbol === "GOOGL"
                  ? "from-blue-500 to-green-500"
                  : "from-blue-600 to-green-600"
              } rounded-full flex items-center justify-center mr-3`}
            >
              <span className="text-white font-bold text-sm">
                {companyData.symbol.substring(0, 2)}
              </span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">{companyData.name}</h4>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-gray-700 mr-2">
                  {companyData.symbol}
                </span>
                <span
                  className={`text-sm font-bold px-2 py-0.5 rounded ${
                    companyData.stockChange.startsWith("+")
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {companyData.stockPrice} {companyData.stockChange}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setCompanyData(null)}
            className="text-gray-500 hover:text-gray-700 text-sm px-2 py-1 rounded hover:bg-gray-100"
          >
            Clear
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs mt-2">
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">CEO:</span>
            <span className="font-medium truncate">{companyData.ceo}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">Market Cap:</span>
            <span className="font-medium">{companyData.marketCap}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">Industry:</span>
            <span className="font-medium truncate">
              {companyData.industry.split(",")[0]}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">Revenue:</span>
            <span className="font-medium truncate">
              {companyData.revenue.split("(")[0]}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 18) return "Good afternoon!";
    return "Good evening!";
  };

  return (
    <div className="fixed bottom-4 left-4 z-[9998] font-sans">
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group hover:scale-105"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        {!isOpen && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-white text-xs">AI</span>
          </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 animate-slide-up">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-purple-500 bg-white">
                  <img
                    src="/eapl.png"
                    alt="AI Assistant"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                      e.target.onerror = null;
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white">EAPL Assistant</h3>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-700 rounded-full mr-2 animate-pulse"></div>
                    <p className="text-xs text-blue-100">Online</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleLanguage}
                  className="text-xs px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-white transition"
                >
                  {language === "english" ? "বাংলা" : "EN"}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Company Summary */}
          {renderCompanySummary()}

          {/* Messages Container */}
          <div className="p-4 h-96 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.sender === "user" ? "text-right" : ""
                }`}
              >
                <div
                  className={`inline-block max-w-xs lg:max-w-md rounded-2xl px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white border border-gray-200 rounded-tl-none shadow-sm"
                  }`}
                >
                  <div className="text-sm whitespace-pre-line">
                    {message.text.split("**").map((part, index) =>
                      index % 2 === 1 ? (
                        <strong
                          key={index}
                          className={
                            message.sender === "user"
                              ? "text-blue-100"
                              : "text-blue-700"
                          }
                        >
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </div>
                </div>
                <div
                  className={`text-xs text-gray-500 mt-1 ${
                    message.sender === "user" ? "text-right" : ""
                  }`}
                >
                  {formatTime(new Date(message.timestamp))}
                </div>
              </div>
            ))}
            {loading && (
              <div className="mb-4">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 inline-block">
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-gray-600 mr-2">
                      Fetching data...
                    </div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.query)}
                  className="text-xs px-3 py-1.5 bg-white border border-gray-300 rounded-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition"
                >
                  {action.label}
                </button>
              ))}
              <button
                onClick={() => handleQuickAction("EAPL news")}
                className="text-xs px-3 py-1.5 bg-white border border-gray-300 rounded-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition"
              >
                EAPL News
              </button>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`${getGreeting()} Ask about EAPL, Apple, Google, or Microsoft...`}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-r-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500 flex justify-between">
              <div>
                <span className="font-medium">Try:</span> "EAPL stock" • "EAPL
                CEO" • "EAPL products" • "AAPL news"
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                <span>Real-time data</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
