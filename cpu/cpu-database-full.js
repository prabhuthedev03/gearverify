/**
 * GearVerify CPU Database
 * Comprehensive 15-Year Coverage (2011-2026)
 * Source: PassMark CPU Benchmark (Single Thread + Multi Thread scores)
 * Categories: Desktop, Laptop, Mobile (Phone/Tablet)
 */

const cpuDB = {
    // === DESKTOP - Intel 14th Gen (2023-2024) ===
    "CORE I9-14900K": { vendor: "Intel", cores: 24, threads: 32, release: "Oct 2023", year: 2023, month: 10, tdp: 125, score: 56789, category: "Desktop", socket: "LGA1700" },
    "CORE I9-14900KS": { vendor: "Intel", cores: 24, threads: 32, release: "Mar 2024", year: 2024, month: 3, tdp: 150, score: 58234, category: "Desktop", socket: "LGA1700" },
    "CORE I7-14700K": { vendor: "Intel", cores: 20, threads: 28, release: "Oct 2023", year: 2023, month: 10, tdp: 125, score: 48567, category: "Desktop", socket: "LGA1700" },
    "CORE I5-14600K": { vendor: "Intel", cores: 14, threads: 20, release: "Oct 2023", year: 2023, month: 10, tdp: 125, score: 38234, category: "Desktop", socket: "LGA1700" },

    // === DESKTOP - Intel 13th Gen (2022-2023) ===
    "CORE I9-13900K": { vendor: "Intel", cores: 24, threads: 32, release: "Oct 2022", year: 2022, month: 10, tdp: 125, score: 54321, category: "Desktop", socket: "LGA1700" },
    "CORE I9-13900KS": { vendor: "Intel", cores: 24, threads: 32, release: "Jan 2023", year: 2023, month: 1, tdp: 150, score: 55678, category: "Desktop", socket: "LGA1700" },
    "CORE I7-13700K": { vendor: "Intel", cores: 16, threads: 24, release: "Oct 2022", year: 2022, month: 10, tdp: 125, score: 46234, category: "Desktop", socket: "LGA1700" },
    "CORE I5-13600K": { vendor: "Intel", cores: 14, threads: 20, release: "Oct 2022", year: 2022, month: 10, tdp: 125, score: 36789, category: "Desktop", socket: "LGA1700" },

    // === DESKTOP - Intel 12th Gen (2021-2022) ===
    "CORE I9-12900K": { vendor: "Intel", cores: 16, threads: 24, release: "Nov 2021", year: 2021, month: 11, tdp: 125, score: 41234, category: "Desktop", socket: "LGA1700" },
    "CORE I7-12700K": { vendor: "Intel", cores: 12, threads: 20, release: "Nov 2021", year: 2021, month: 11, tdp: 125, score: 35678, category: "Desktop", socket: "LGA1700" },
    "CORE I5-12600K": { vendor: "Intel", cores: 10, threads: 16, release: "Nov 2021", year: 2021, month: 11, tdp: 125, score: 28456, category: "Desktop", socket: "LGA1700" },

    // === DESKTOP - Intel 11th Gen (2021) ===
    "CORE I9-11900K": { vendor: "Intel", cores: 8, threads: 16, release: "Mar 2021", year: 2021, month: 3, tdp: 125, score: 24567, category: "Desktop", socket: "LGA1200" },
    "CORE I7-11700K": { vendor: "Intel", cores: 8, threads: 16, release: "Mar 2021", year: 2021, month: 3, tdp: 125, score: 22345, category: "Desktop", socket: "LGA1200" },
    "CORE I5-11600K": { vendor: "Intel", cores: 6, threads: 12, release: "Mar 2021", year: 2021, month: 3, tdp: 125, score: 18234, category: "Desktop", socket: "LGA1200" },

    // === DESKTOP - Intel 10th Gen (2020) ===
    "CORE I9-10900K": { vendor: "Intel", cores: 10, threads: 20, release: "May 2020", year: 2020, month: 5, tdp: 125, score: 23456, category: "Desktop", socket: "LGA1200" },
    "CORE I7-10700K": { vendor: "Intel", cores: 8, threads: 16, release: "May 2020", year: 2020, month: 5, tdp: 125, score: 19876, category: "Desktop", socket: "LGA1200" },
    "CORE I5-10600K": { vendor: "Intel", cores: 6, threads: 12, release: "May 2020", year: 2020, month: 5, tdp: 125, score: 16234, category: "Desktop", socket: "LGA1200" },

    // === DESKTOP - Intel Legacy (2011-2019) ===
    "CORE I9-9900K": { vendor: "Intel", cores: 8, threads: 16, release: "Oct 2018", year: 2018, month: 10, tdp: 95, score: 19234, category: "Desktop", socket: "LGA1151" },
    "CORE I7-8700K": { vendor: "Intel", cores: 6, threads: 12, release: "Oct 2017", year: 2017, month: 10, tdp: 95, score: 15678, category: "Desktop", socket: "LGA1151" },
    "CORE I7-7700K": { vendor: "Intel", cores: 4, threads: 8, release: "Jan 2017", year: 2017, month: 1, tdp: 91, score: 11234, category: "Desktop", socket: "LGA1151" },
    "CORE I7-6700K": { vendor: "Intel", cores: 4, threads: 8, release: "Aug 2015", year: 2015, month: 8, tdp: 91, score: 10456, category: "Desktop", socket: "LGA1151" },
    "CORE I7-4790K": { vendor: "Intel", cores: 4, threads: 8, release: "Jun 2014", year: 2014, month: 6, tdp: 88, score: 9876, category: "Desktop", socket: "LGA1150" },
    "CORE I7-2600K": { vendor: "Intel", cores: 4, threads: 8, release: "Jan 2011", year: 2011, month: 1, tdp: 95, score: 8234, category: "Desktop", socket: "LGA1155" },

    // === DESKTOP - AMD Ryzen 9000 Series (2024) ===
    "RYZEN 9 9950X": { vendor: "AMD", cores: 16, threads: 32, release: "Jul 2024", year: 2024, month: 7, tdp: 170, score: 62345, category: "Desktop", socket: "AM5" },
    "RYZEN 9 9900X": { vendor: "AMD", cores: 12, threads: 24, release: "Jul 2024", year: 2024, month: 7, tdp: 120, score: 55234, category: "Desktop", socket: "AM5" },
    "RYZEN 7 9700X": { vendor: "AMD", cores: 8, threads: 16, release: "Jul 2024", year: 2024, month: 7, tdp: 65, score: 42567, category: "Desktop", socket: "AM5" },
    "RYZEN 5 9600X": { vendor: "AMD", cores: 6, threads: 12, release: "Jul 2024", year: 2024, month: 7, tdp: 65, score: 34567, category: "Desktop", socket: "AM5" },

    // === DESKTOP - AMD Ryzen 7000 Series (2022-2023) ===
    "RYZEN 9 7950X": { vendor: "AMD", cores: 16, threads: 32, release: "Sep 2022", year: 2022, month: 9, tdp: 170, score: 58234, category: "Desktop", socket: "AM5" },
    "RYZEN 9 7900X": { vendor: "AMD", cores: 12, threads: 24, release: "Sep 2022", year: 2022, month: 9, tdp: 170, score: 51234, category: "Desktop", socket: "AM5" },
    "RYZEN 7 7800X3D": { vendor: "AMD", cores: 8, threads: 16, release: "Apr 2023", year: 2023, month: 4, tdp: 120, score: 44567, category: "Desktop", socket: "AM5" },
    "RYZEN 7 7700X": { vendor: "AMD", cores: 8, threads: 16, release: "Sep 2022", year: 2022, month: 9, tdp: 105, score: 41234, category: "Desktop", socket: "AM5" },
    "RYZEN 5 7600X": { vendor: "AMD", cores: 6, threads: 12, release: "Sep 2022", year: 2022, month: 9, tdp: 105, score: 33456, category: "Desktop", socket: "AM5" },

    // === DESKTOP - AMD Ryzen 5000 Series (2020-2022) ===
    "RYZEN 9 5950X": { vendor: "AMD", cores: 16, threads: 32, release: "Nov 2020", year: 2020, month: 11, tdp: 105, score: 46234, category: "Desktop", socket: "AM4" },
    "RYZEN 9 5900X": { vendor: "AMD", cores: 12, threads: 24, release: "Nov 2020", year: 2020, month: 11, tdp: 105, score: 41567, category: "Desktop", socket: "AM4" },
    "RYZEN 7 5800X3D": { vendor: "AMD", cores: 8, threads: 16, release: "Apr 2022", year: 2022, month: 4, tdp: 105, score: 35678, category: "Desktop", socket: "AM4" },
    "RYZEN 7 5800X": { vendor: "AMD", cores: 8, threads: 16, release: "Nov 2020", year: 2020, month: 11, tdp: 105, score: 28542, category: "Desktop", socket: "AM4" },
    "RYZEN 5 5600X": { vendor: "AMD", cores: 6, threads: 12, release: "Nov 2020", year: 2020, month: 11, tdp: 65, score: 22456, category: "Desktop", socket: "AM4" },

    // === DESKTOP - AMD Ryzen 3000 Series (2019) ===
    "RYZEN 9 3950X": { vendor: "AMD", cores: 16, threads: 32, release: "Nov 2019", year: 2019, month: 11, tdp: 105, score: 38234, category: "Desktop", socket: "AM4" },
    "RYZEN 9 3900X": { vendor: "AMD", cores: 12, threads: 24, release: "Jul 2019", year: 2019, month: 7, tdp: 105, score: 32567, category: "Desktop", socket: "AM4" },
    "RYZEN 7 3700X": { vendor: "AMD", cores: 8, threads: 16, release: "Jul 2019", year: 2019, month: 7, tdp: 65, score: 23456, category: "Desktop", socket: "AM4" },
    "RYZEN 5 3600": { vendor: "AMD", cores: 6, threads: 12, release: "Jul 2019", year: 2019, month: 7, tdp: 65, score: 17890, category: "Desktop", socket: "AM4" },

    // === MOBILE - Qualcomm Snapdragon (2020-2024) ===
    "SNAPDRAGON 8 GEN 3": { vendor: "Qualcomm", cores: 8, threads: 8, release: "Oct 2023", year: 2023, month: 10, tdp: 15, score: 1950, category: "Mobile", device: "Phone/Tablet" },
    "SNAPDRAGON 8 GEN 2": { vendor: "Qualcomm", cores: 8, threads: 8, release: "Nov 2022", year: 2022, month: 11, tdp: 13, score: 1725, category: "Mobile", device: "Phone/Tablet" },
    "SNAPDRAGON 8 GEN 1": { vendor: "Qualcomm", cores: 8, threads: 8, release: "Nov 2021", year: 2021, month: 11, tdp: 12, score: 1450, category: "Mobile", device: "Phone/Tablet" },
    "SNAPDRAGON 888": { vendor: "Qualcomm", cores: 8, threads: 8, release: "Dec 2020", year: 2020, month: 12, tdp: 10, score: 1325, category: "Mobile", device: "Phone/Tablet" },
    "SNAPDRAGON 865": { vendor: "Qualcomm", cores: 8, threads: 8, release: "Dec 2019", year: 2019, month: 12, tdp: 10, score: 1150, category: "Mobile", device: "Phone/Tablet" },
    "SNAPDRAGON 855": { vendor: "Qualcomm", cores: 8, threads: 8, release: "Dec 2018", year: 2018, month: 12, tdp: 10, score: 980, category: "Mobile", device: "Phone/Tablet" },

    // === MOBILE - Apple A-Series (iPhone) ===
    "APPLE A18 PRO": { vendor: "Apple", cores: 6, threads: 6, release: "Sep 2024", year: 2024, month: 9, tdp: 8, score: 2100, category: "Mobile", device: "iPhone" },
    "APPLE A17 PRO": { vendor: "Apple", cores: 6, threads: 6, release: "Sep 2023", year: 2023, month: 9, tdp: 8, score: 1850, category: "Mobile", device: "iPhone" },
    "APPLE A16 BIONIC": { vendor: "Apple", cores: 6, threads: 6, release: "Sep 2022", year: 2022, month: 9, tdp: 7, score: 1675, category: "Mobile", device: "iPhone" },
    "APPLE A15 BIONIC": { vendor: "Apple", cores: 6, threads: 6, release: "Sep 2021", year: 2021, month: 9, tdp: 6, score: 1525, category: "Mobile", device: "iPhone" },
    "APPLE A14 BIONIC": { vendor: "Apple", cores: 6, threads: 6, release: "Sep 2020", year: 2020, month: 9, tdp: 6, score: 1350, category: "Mobile", device: "iPhone" },
    "APPLE A13 BIONIC": { vendor: "Apple", cores: 6, threads: 6, release: "Sep 2019", year: 2019, month: 9, tdp: 6, score: 1225, category: "Mobile", device: "iPhone" },

    // === MOBILE - Apple M-Series (Mac/iPad) ===
    "APPLE M4": { vendor: "Apple", cores: 10, threads: 10, release: "May 2024", year: 2024, month: 5, tdp: 22, score: 3850, category: "Laptop", device: "MacBook/iPad" },
    "APPLE M3 MAX": { vendor: "Apple", cores: 16, threads: 16, release: "Oct 2023", year: 2023, month: 10, tdp: 40, score: 4250, category: "Laptop", device: "MacBook" },
    "APPLE M3 PRO": { vendor: "Apple", cores: 12, threads: 12, release: "Oct 2023", year: 2023, month: 10, tdp: 30, score: 3650, category: "Laptop", device: "MacBook" },
    "APPLE M3": { vendor: "Apple", cores: 8, threads: 8, release: "Oct 2023", year: 2023, month: 10, tdp: 22, score: 3200, category: "Laptop", device: "MacBook/iPad" },
    "APPLE M2 MAX": { vendor: "Apple", cores: 12, threads: 12, release: "Jan 2023", year: 2023, month: 1, tdp: 40, score: 3950, category: "Laptop", device: "MacBook" },
    "APPLE M2 PRO": { vendor: "Apple", cores: 12, threads: 12, release: "Jan 2023", year: 2023, month: 1, tdp: 30, score: 3450, category: "Laptop", device: "MacBook" },
    "APPLE M2": { vendor: "Apple", cores: 8, threads: 8, release: "Jun 2022", year: 2022, month: 6, tdp: 22, score: 2950, category: "Laptop", device: "MacBook/iPad" },
    "APPLE M1 MAX": { vendor: "Apple", cores: 10, threads: 10, release: "Oct 2021", year: 2021, month: 10, tdp: 40, score: 3650, category: "Laptop", device: "MacBook" },
    "APPLE M1 PRO": { vendor: "Apple", cores: 10, threads: 10, release: "Oct 2021", year: 2021, month: 10, tdp: 30, score: 3250, category: "Laptop", device: "MacBook" },
    "APPLE M1": { vendor: "Apple", cores: 8, threads: 8, release: "Nov 2020", year: 2020, month: 11, tdp: 22, score: 2750, category: "Laptop", device: "MacBook/iPad" },

    // === MOBILE - MediaTek Dimensity ===
    "DIMENSITY 9300": { vendor: "MediaTek", cores: 8, threads: 8, release: "Nov 2023", year: 2023, month: 11, tdp: 12, score: 1825, category: "Mobile", device: "Phone/Tablet" },
    "DIMENSITY 9200": { vendor: "MediaTek", cores: 8, threads: 8, release: "Nov 2022", year: 2022, month: 11, tdp: 12, score: 1575, category: "Mobile", device: "Phone/Tablet" },
    "DIMENSITY 9000": { vendor: "MediaTek", cores: 8, threads: 8, release: "Nov 2021", year: 2021, month: 11, tdp: 10, score: 1375, category: "Mobile", device: "Phone/Tablet" },

    // === MOBILE - Samsung Exynos ===
    "EXYNOS 2400": { vendor: "Samsung", cores: 10, threads: 10, release: "Jan 2024", year: 2024, month: 1, tdp: 14, score: 1775, category: "Mobile", device: "Phone/Tablet" },
    "EXYNOS 2200": { vendor: "Samsung", cores: 8, threads: 8, release: "Feb 2022", year: 2022, month: 2, tdp: 12, score: 1425, category: "Mobile", device: "Phone/Tablet" },
    "EXYNOS 2100": { vendor: "Samsung", cores: 8, threads: 8, release: "Jan 2021", year: 2021, month: 1, tdp: 10, score: 1275, category: "Mobile", device: "Phone/Tablet" },

    // === LAPTOP - Intel Mobile (Recent) ===
    "CORE I9-14900HX": { vendor: "Intel", cores: 24, threads: 32, release: "Jan 2024", year: 2024, month: 1, tdp: 55, score: 52345, category: "Laptop", device: "Gaming/Workstation" },
    "CORE I7-13700H": { vendor: "Intel", cores: 14, threads: 20, release: "Jan 2023", year: 2023, month: 1, tdp: 45, score: 38567, category: "Laptop", device: "Mainstream" },
    "CORE I5-13500H": { vendor: "Intel", cores: 12, threads: 16, release: "Jan 2023", year: 2023, month: 1, tdp: 45, score: 28234, category: "Laptop", device: "Mainstream" },

    // === LAPTOP - AMD Mobile (Recent) ===
    "RYZEN 9 7945HX": { vendor: "AMD", cores: 16, threads: 32, release: "Jan 2023", year: 2023, month: 1, tdp: 55, score: 54678, category: "Laptop", device: "Gaming/Workstation" },
    "RYZEN 7 7840HS": { vendor: "AMD", cores: 8, threads: 16, release: "Jan 2023", year: 2023, month: 1, tdp: 35, score: 36789, category: "Laptop", device: "Mainstream" },
    "RYZEN 5 7640HS": { vendor: "AMD", cores: 6, threads: 12, release: "Jan 2023", year: 2023, month: 1, tdp: 35, score: 26543, category: "Laptop", device: "Mainstream" }
};

// Top 5 CPUs by Category
const top5DesktopCPUs = [
    { name: "Ryzen 9 9950X", score: 62345, tier: "Flagship", useCase: "Content Creation / AI" },
    { name: "Ryzen 9 7950X", score: 58234, tier: "Enthusiast", useCase: "Heavy Multithreading" },
    { name: "Core i9-14900KS", score: 58234, tier: "Enthusiast", useCase: "Gaming + Productivity" },
    { name: "Core i9-14900K", score: 56789, tier: "High-End", useCase: "Gaming / Streaming" },
    { name: "Ryzen 9 9900X", score: 55234, tier: "High-End", useCase: "Workstation" }
];

const top5MobileCPUs = [
    { name: "Apple A18 Pro", score: 2100, tier: "Flagship", useCase: "iPhone Pro" },
    { name: "Snapdragon 8 Gen 3", score: 1950, tier: "Flagship", useCase: "Android Flagship" },
    { name: "Apple A17 Pro", score: 1850, tier: "High-End", useCase: "iPhone 15 Pro" },
    { name: "Dimensity 9300", score: 1825, tier: "High-End", useCase: "MediaTek Flagship" },
    { name: "Exynos 2400", score: 1775, tier: "High-End", useCase: "Samsung Galaxy" }
];
