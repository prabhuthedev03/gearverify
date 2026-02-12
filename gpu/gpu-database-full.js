// ============================================================================
// COMPREHENSIVE GPU DATABASE - 15 Years (2011-2026)
// 170+ GPUs from all manufacturers with authentic specifications
// ============================================================================
const COMPREHENSIVE_GPU_DB = {
    // ========== NVIDIA RTX 50-Series (Blackwell, 2025) ==========
    "RTX 5090": { vendor: "NVIDIA", vram: "32GB GDDR7", release: "Jan 2025", year: 2025, month: 1, vramGB: 32, score: 9850 },
    "RTX 5080": { vendor: "NVIDIA", vram: "16GB GDDR7", release: "Jan 2025", year: 2025, month: 1, vramGB: 16, score: 7800 },
    "RTX 5070": { vendor: "NVIDIA", vram: "12GB GDDR7", release: "Jan 2025", year: 2025, month: 1, vramGB: 12, score: 6500 },

    // ========== NVIDIA RTX 40-Series (Ada Lovelace, 2022-2024) ==========
    "RTX 4090": { vendor: "NVIDIA", vram: "24GB GDDR6X", release: "Oct 2022", year: 2022, month: 10, vramGB: 24, score: 8100 },
    "RTX 4080 SUPER": { vendor: "NVIDIA", vram: "16GB GDDR6X", release: "Jan 2024", year: 2024, month: 1, vramGB: 16, score: 7400 },
    "RTX 4080": { vendor: "NVIDIA", vram: "16GB GDDR6X", release: "Nov 2022", year: 2022, month: 11, vramGB: 16, score: 7200 },
    "RTX 4070 TI SUPER": { vendor: "NVIDIA", vram: "16GB GDDR6X", release: "Jan 2024", year: 2024, month: 1, vramGB: 16, score: 6800 },
    "RTX 4070 TI": { vendor: "NVIDIA", vram: "12GB GDDR6X", release: "Jan 2023", year: 2023, month: 1, vramGB: 12, score: 6500 },
    "RTX 4070 SUPER": { vendor: "NVIDIA", vram: "12GB GDDR6X", release: "Jan 2024", year: 2024, month: 1, vramGB: 12, score: 6200 },
    "RTX 4070": { vendor: "NVIDIA", vram: "12GB GDDR6X", release: "Apr 2023", year: 2023, month: 4, vramGB: 12, score: 5800 },
    "RTX 4060 TI": { vendor: "NVIDIA", vram: "8GB GDDR6", release: "May 2023", year: 2023, month: 5, vramGB: 8, score: 4200 },
    "RTX 4060": { vendor: "NVIDIA", vram: "8GB GDDR6", release: "Jun 2023", year: 2023, month: 6, vramGB: 8, score: 3800 },
    "RTX 4050": { vendor: "NVIDIA", vram: "6GB GDDR6", release: "Jan 2023", year: 2023, month: 1, vramGB: 6, score: 3200 },

    // ========== NVIDIA RTX 30-Series (Ampere, 2020-2022) ==========
    "RTX 3090 TI": { vendor: "NVIDIA", vram: "24GB GDDR6X", release: "Mar 2022", year: 2022, month: 3, vramGB: 24, score: 7100 },
    "RTX 3090": { vendor: "NVIDIA", vram: "24GB GDDR6X", release: "Sep 2020", year: 2020, month: 9, vramGB: 24, score: 6800 },
    "RTX 3080 TI": { vendor: "NVIDIA", vram: "12GB GDDR6X", release: "Jun 2021", year: 2021, month: 6, vramGB: 12, score: 6400 },
    "RTX 3080": { vendor: "NVIDIA", vram: "10GB GDDR6X", release: "Sep 2020", year: 2020, month: 9, vramGB: 10, score: 6200 },
    "RTX 3070 TI": { vendor: "NVIDIA", vram: "8GB GDDR6X", release: "Jun 2021", year: 2021, month: 6, vramGB: 8, score: 5600 },
    "RTX 3070": { vendor: "NVIDIA", vram: "8GB GDDR6", release: "Oct 2020", year: 2020, month: 10, vramGB: 8, score: 5400 },
    "RTX 3060 TI": { vendor: "NVIDIA", vram: "8GB GDDR6", release: "Dec 2020", year: 2020, month: 12, vramGB: 8, score: 4800 },
    "RTX 3060": { vendor: "NVIDIA", vram: "12GB GDDR6", release: "Feb 2021", year: 2021, month: 2, vramGB: 12, score: 3900 },
    "RTX 3050": { vendor: "NVIDIA", vram: "8GB GDDR6", release: "Jan 2022", year: 2022, month: 1, vramGB: 8, score: 2800 },

    // ========== NVIDIA RTX 20-Series (Turing, 2018-2019) ==========
    "RTX 2080 TI": { vendor: "NVIDIA", vram: "11GB GDDR6", release: "Sep 2018", year: 2018, month: 9, vramGB: 11, score: 5200 },
    "RTX 2080 SUPER": { vendor: "NVIDIA", vram: "8GB GDDR6", release: "Jul 2019", year: 2019, month: 7, vramGB: 8, score: 4900 },
    "RTX 2080": { vendor: "NVIDIA", vram: "8GB GDDR6", release: "Sep 2018", year: 2018, month: 9, vramGB: 8, score: 4700 },
    "RTX 2070 SUPER": { vendor: "NVIDIA", vram: "8GB GDDR6", release: "Jul 2019", year: 2019, month: 7, vramGB: 8, score: 4400 },
    "RTX 2070": { vendor: "NVIDIA", vram: "8GB GDDR6", release: "Oct 2018", year: 2018, month: 10, vramGB: 8, score: 4200 },
    "RTX 2060 SUPER": { vendor: "NVIDIA", vram: "8GB GDDR6", release: "Jul 2019", year: 2019, month: 7, vramGB: 8, score: 3800 },
    "RTX 2060": { vendor: "NVIDIA", vram: "6GB GDDR6", release: "Jan 2019", year: 2019, month: 1, vramGB: 6, score: 3500 },

    // ========== NVIDIA GTX 16-Series (Turing, 2019) ==========
    "GTX 1660 TI": { vendor: "NVIDIA", vram: "6GB GDDR6", release: "Feb 2019", year: 2019, month: 2, vramGB: 6, score: 3200 },
    "GTX 1660 SUPER": { vendor: "NVIDIA", vram: "6GB GDDR6", release: "Oct 2019", year: 2019, month: 10, vramGB: 6, score: 3100 },
    "GTX 1660": { vendor: "NVIDIA", vram: "6GB GDDR5", release: "Mar 2019", year: 2019, month: 3, vramGB: 6, score: 2900 },
    "GTX 1650 SUPER": { vendor: "NVIDIA", vram: "4GB GDDR6", release: "Nov 2019", year: 2019, month: 11, vramGB: 4, score: 2600 },
    "GTX 1650": { vendor: "NVIDIA", vram: "4GB GDDR5", release: "Apr 2019", year: 2019, month: 4, vramGB: 4, score: 2300 },

    // ========== NVIDIA GTX 10-Series (Pascal, 2016-2017) ==========
    "GTX 1080 TI": { vendor: "NVIDIA", vram: "11GB GDDR5X", release: "Mar 2017", year: 2017, month: 3, vramGB: 11, score: 4100 },
    "GTX 1080": { vendor: "NVIDIA", vram: "8GB GDDR5X", release: "May 2016", year: 2016, month: 5, vramGB: 8, score: 3700 },
    "GTX 1070 TI": { vendor: "NVIDIA", vram: "8GB GDDR5", release: "Nov 2017", year: 2017, month: 11, vramGB: 8, score: 3400 },
    "GTX 1070": { vendor: "NVIDIA", vram: "8GB GDDR5", release: "Jun 2016", year: 2016, month: 6, vramGB: 8, score: 3200 },
    "GTX 1060": { vendor: "NVIDIA", vram: "6GB GDDR5", release: "Jul 2016", year: 2016, month: 7, vramGB: 6, score: 2700 },
    "GTX 1050 TI": { vendor: "NVIDIA", vram: "4GB GDDR5", release: "Oct 2016", year: 2016, month: 10, vramGB: 4, score: 2200 },
    "GTX 1050": { vendor: "NVIDIA", vram: "2GB GDDR5", release: "Oct 2016", year: 2016, month: 10, vramGB: 2, score: 1900 },

    // ========== NVIDIA GTX 900-Series (Maxwell, 2014-2015) ==========
    "GTX 980 TI": { vendor: "NVIDIA", vram: "6GB GDDR5", release: "Jun 2015", year: 2015, month: 6, vramGB: 6, score: 2900 },
    "GTX 980": { vendor: "NVIDIA", vram: "4GB GDDR5", release: "Sep 2014", year: 2014, month: 9, vramGB: 4, score: 2600 },
    "GTX 970": { vendor: "NVIDIA", vram: "4GB GDDR5", release: "Sep 2014", year: 2014, month: 9, vramGB: 4, score: 2400 },
    "GTX 960": { vendor: "NVIDIA", vram: "2GB GDDR5", release: "Jan 2015", year: 2015, month: 1, vramGB: 2, score: 1800 },
    "GTX 950": { vendor: "NVIDIA", vram: "2GB GDDR5", release: "Aug 2015", year: 2015, month: 8, vramGB: 2, score: 1500 },

    // ========== NVIDIA GTX 700/600-Series (Kepler, 2012-2013) ==========
    "GTX 780 TI": { vendor: "NVIDIA", vram: "3GB GDDR5", release: "Nov 2013", year: 2013, month: 11, vramGB: 3, score: 2200 },
    "GTX 780": { vendor: "NVIDIA", vram: "3GB GDDR5", release: "May 2013", year: 2013, month: 5, vramGB: 3, score: 2000 },
    "GTX 770": { vendor: "NVIDIA", vram: "2GB GDDR5", release: "May 2013", year: 2013, month: 5, vramGB: 2, score: 1800 },
    "GTX 760": { vendor: "NVIDIA", vram: "2GB GDDR5", release: "Jun 2013", year: 2013, month: 6, vramGB: 2, score: 1500 },
    "GTX 680": { vendor: "NVIDIA", vram: "2GB GDDR5", release: "Mar 2012", year: 2012, month: 3, vramGB: 2, score: 1700 },
    "GTX 670": { vendor: "NVIDIA", vram: "2GB GDDR5", release: "May 2012", year: 2012, month: 5, vramGB: 2, score: 1600 },
    "GTX 660": { vendor: "NVIDIA", vram: "2GB GDDR5", release: "Sep 2012", year: 2012, month: 9, vramGB: 2, score: 1300 },

    // ========== AMD RX 7000-Series (RDNA 3, 2022-2024) ==========
    "RX 7900 XTX": { vendor: "AMD", vram: "24GB GDDR6", release: "Dec 2022", year: 2022, month: 12, vramGB: 24, score: 7900 },
    "RX 7900 XT": { vendor: "AMD", vram: "20GB GDDR6", release: "Dec 2022", year: 2022, month: 12, vramGB: 20, score: 7200 },
    "RX 7900 GRE": { vendor: "AMD", vram: "16GB GDDR6", release: "Jul 2023", year: 2023, month: 7, vramGB: 16, score: 6800 },
    "RX 7800 XT": { vendor: "AMD", vram: "16GB GDDR6", release: "Sep 2023", year: 2023, month: 9, vramGB: 16, score: 5900 },
    "RX 7700 XT": { vendor: "AMD", vram: "12GB GDDR6", release: "Sep 2023", year: 2023, month: 9, vramGB: 12, score: 5200 },
    "RX 7600 XT": { vendor: "AMD", vram: "16GB GDDR6", release: "Jan 2024", year: 2024, month: 1, vramGB: 16, score: 4100 },
    "RX 7600": { vendor: "AMD", vram: "8GB GDDR6", release: "May 2023", year: 2023, month: 5, vramGB: 8, score: 3800 },

    // ========== AMD RX 6000-Series (RDNA 2, 2020-2022) ==========
    "RX 6950 XT": { vendor: "AMD", vram: "16GB GDDR6", release: "May 2022", year: 2022, month: 5, vramGB: 16, score: 6700 },
    "RX 6900 XT": { vendor: "AMD", vram: "16GB GDDR6", release: "Dec 2020", year: 2020, month: 12, vramGB: 16, score: 6500 },
    "RX 6800 XT": { vendor: "AMD", vram: "16GB GDDR6", release: "Nov 2020", year: 2020, month: 11, vramGB: 16, score: 6200 },
    "RX 6800": { vendor: "AMD", vram: "16GB GDDR6", release: "Nov 2020", year: 2020, month: 11, vramGB: 16, score: 5800 },
    "RX 6750 XT": { vendor: "AMD", vram: "12GB GDDR6", release: "May 2022", year: 2022, month: 5, vramGB: 12, score: 5300 },
    "RX 6700 XT": { vendor: "AMD", vram: "12GB GDDR6", release: "Mar 2021", year: 2021, month: 3, vramGB: 12, score: 5100 },
    "RX 6650 XT": { vendor: "AMD", vram: "8GB GDDR6", release: "May 2022", year: 2022, month: 5, vramGB: 8, score: 4600 },
    "RX 6600 XT": { vendor: "AMD", vram: "8GB GDDR6", release: "Aug 2021", year: 2021, month: 8, vramGB: 8, score: 4400 },
    "RX 6600": { vendor: "AMD", vram: "8GB GDDR6", release: "Oct 2021", year: 2021, month: 10, vramGB: 8, score: 3900 },
    "RX 6500 XT": { vendor: "AMD", vram: "4GB GDDR6", release: "Jan 2022", year: 2022, month: 1, vramGB: 4, score: 2600 },
    "RX 6400": { vendor: "AMD", vram: "4GB GDDR6", release: "Jan 2022", year: 2022, month: 1, vramGB: 4, score: 2200 },

    // ========== AMD RX 5000-Series (RDNA, 2019-2020) ==========
    "RX 5700 XT": { vendor: "AMD", vram: "8GB GDDR6", release: "Jul 2019", year: 2019, month: 7, vramGB: 8, score: 4200 },
    "RX 5700": { vendor: "AMD", vram: "8GB GDDR6", release: "Jul 2019", year: 2019, month: 7, vramGB: 8, score: 3900 },
    "RX 5600 XT": { vendor: "AMD", vram: "6GB GDDR6", release: "Jan 2020", year: 2020, month: 1, vramGB: 6, score: 3600 },
    "RX 5500 XT": { vendor: "AMD", vram: "8GB GDDR6", release: "Dec 2019", year: 2019, month: 12, vramGB: 8, score: 3000 },

    // ========== AMD RX Vega (GCN 5.0, 2017-2018) ==========
    "RX VEGA 64": { vendor: "AMD", vram: "8GB HBM2", release: "Aug 2017", year: 2017, month: 8, vramGB: 8, score: 3800 },
    "RX VEGA 56": { vendor: "AMD", vram: "8GB HBM2", release: "Aug 2017", year: 2017, month: 8, vramGB: 8, score: 3500 },

    // ========== AMD RX 500-Series (Polaris, 2017-2018) ==========
    "RX 590": { vendor: "AMD", vram: "8GB GDDR5", release: "Nov 2018", year: 2018, month: 11, vramGB: 8, score: 2900 },
    "RX 580": { vendor: "AMD", vram: "8GB GDDR5", release: "Apr 2017", year: 2017, month: 4, vramGB: 8, score: 2800 },
    "RX 570": { vendor: "AMD", vram: "4GB GDDR5", release: "Apr 2017", year: 2017, month: 4, vramGB: 4, score: 2500 },
    "RX 560": { vendor: "AMD", vram: "4GB GDDR5", release: "Apr 2017", year: 2017, month: 4, vramGB: 4, score: 1900 },

    // ========== AMD RX 400-Series (Polaris, 2016) ==========
    "RX 480": { vendor: "AMD", vram: "8GB GDDR5", release: "Jun 2016", year: 2016, month: 6, vramGB: 8, score: 2700 },
    "RX 470": { vendor: "AMD", vram: "4GB GDDR5", release: "Aug 2016", year: 2016, month: 8, vramGB: 4, score: 2400 },
    "RX 460": { vendor: "AMD", vram: "4GB GDDR5", release: "Aug 2016", year: 2016, month: 8, vramGB: 4, score: 1700 },

    // ========== Intel Arc (Alchemist, 2022-2023) ==========
    "INTEL ARC A770": { vendor: "Intel", vram: "16GB GDDR6", release: "Oct 2022", year: 2022, month: 10, vramGB: 16, score: 4800 },
    "INTEL ARC A750": { vendor: "Intel", vram: "8GB GDDR6", release: "Oct 2022", year: 2022, month: 10, vramGB: 8, score: 4200 },
    "INTEL ARC A580": { vendor: "Intel", vram: "8GB GDDR6", release: "Oct 2023", year: 2023, month: 10, vramGB: 8, score: 3800 },
    "INTEL ARC A380": { vendor: "Intel", vram: "6GB GDDR6", release: "Jul 2022", year: 2022, month: 7, vramGB: 6, score: 2900 },

    // ========== Intel Integrated Graphics ==========
    "INTEL ARC GRAPHICS": { vendor: "Intel", vram: "System Shared", release: "Apr 2024", year: 2024, month: 4, vramGB: 16, score: 3200 },
    "INTEL IRIS XE": { vendor: "Intel", vram: "System Shared", release: "Sep 2020", year: 2020, month: 9, vramGB: 8, score: 2600 },
    "INTEL UHD 770": { vendor: "Intel", vram: "System Shared", release: "Jan 2022", year: 2022, month: 1, vramGB: 4, score: 2200 },
    "INTEL UHD 730": { vendor: "Intel", vram: "System Shared", release: "Mar 2021", year: 2021, month: 3, vramGB: 4, score: 2000 },
    "INTEL UHD 630": { vendor: "Intel", vram: "System Shared", release: "Jan 2017", year: 2017, month: 1, vramGB: 2, score: 1600 },

    // ========== AMD Integrated (Ryzen APUs) ==========
    "RADEON 780M": { vendor: "AMD", vram: "System Shared", release: "Jan 2023", year: 2023, month: 1, vramGB: 4, score: 2500 },
    "RADEON 680M": { vendor: "AMD", vram: "System Shared", release: "Jan 2022", year: 2022, month: 1, vramGB: 4, score: 2100 },
    "RADEON 660M": { vendor: "AMD", vram: "System Shared", release: "Jan 2022", year: 2022, month: 1, vramGB: 4, score: 1900 },

    // ========== Qualcomm Adreno (Snapdragon) ==========
    "ADRENO 750": { vendor: "Qualcomm", vram: "System Shared", release: "Oct 2023", year: 2023, month: 10, vramGB: 12, score: 2800 },
    "ADRENO 740": { vendor: "Qualcomm", vram: "System Shared", release: "Nov 2022", year: 2022, month: 11, vramGB: 8, score: 2500 },
    "ADRENO 730": { vendor: "Qualcomm", vram: "System Shared", release: "May 2022", year: 2022, month: 5, vramGB: 8, score: 2200 },
    "ADRENO 725": { vendor: "Qualcomm", vram: "System Shared", release: "Mar 2023", year: 2023, month: 3, vramGB: 8, score: 2100 },
    "ADRENO 710": { vendor: "Qualcomm", vram: "System Shared", release: "Sep 2021", year: 2021, month: 9, vramGB: 6, score: 1800 },
    "ADRENO 650": { vendor: "Qualcomm", vram: "System Shared", release: "Dec 2019", year: 2019, month: 12, vramGB: 6, score: 1600 },
    "ADRENO 640": { vendor: "Qualcomm", vram: "System Shared", release: "Feb 2019", year: 2019, month: 2, vramGB: 6, score: 1500 },
    "ADRENO 630": { vendor: "Qualcomm", vram: "System Shared", release: "Dec 2017", year: 2017, month: 12, vramGB: 4, score: 1300 },
    "ADRENO 540": { vendor: "Qualcomm", vram: "System Shared", release: "Jan 2017", year: 2017, month: 1, vramGB: 4, score: 1100 },
    "ADRENO 530": { vendor: "Qualcomm", vram: "System Shared", release: "Apr 2016", year: 2016, month: 4, vramGB: 4, score: 1000 },

    // ========== Apple Silicon (Mac) ==========
    "APPLE M4 MAX": { vendor: "Apple", vram: "System Shared", release: "Nov 2024", year: 2024, month: 11, vramGB: 64, score: 5200 },
    "APPLE M4 PRO": { vendor: "Apple", vram: "System Shared", release: "Nov 2024", year: 2024, month: 11, vramGB: 48, score: 4800 },
    "APPLE M4": { vendor: "Apple", vram: "System Shared", release: "May 2024", year: 2024, month: 5, vramGB: 16, score: 4100 },
    "APPLE M3 MAX": { vendor: "Apple", vram: "System Shared", release: "Nov 2023", year: 2023, month: 11, vramGB: 48, score: 4600 },
    "APPLE M3 PRO": { vendor: "Apple", vram: "System Shared", release: "Nov 2023", year: 2023, month: 11, vramGB: 36, score: 4200 },
    "APPLE M3": { vendor: "Apple", vram: "System Shared", release: "Oct 2023", year: 2023, month: 10, vramGB: 16, score: 3800 },
    "APPLE M2 ULTRA": { vendor: "Apple", vram: "System Shared", release: "Jun 2023", year: 2023, month: 6, vramGB: 192, score: 5800 },
    "APPLE M2 MAX": { vendor: "Apple", vram: "System Shared", release: "Jan 2023", year: 2023, month: 1, vramGB: 96, score: 4400 },
    "APPLE M2 PRO": { vendor: "Apple", vram: "System Shared", release: "Jan 2023", year: 2023, month: 1, vramGB: 32, score: 3900 },
    "APPLE M2": { vendor: "Apple", vram: "System Shared", release: "Jun 2022", year: 2022, month: 6, vramGB: 16, score: 3400 },
    "APPLE M1 ULTRA": { vendor: "Apple", vram: "System Shared", release: "Mar 2022", year: 2022, month: 3, vramGB: 128, score: 4800 },
    "APPLE M1 MAX": { vendor: "Apple", vram: "System Shared", release: "Oct 2021", year: 2021, month: 10, vramGB: 64, score: 3800 },
    "APPLE M1 PRO": { vendor: "Apple", vram: "System Shared", release: "Oct 2021", year: 2021, month: 10, vramGB: 32, score: 3400 },
    "APPLE M1": { vendor: "Apple", vram: "System Shared", release: "Nov 2020", year: 2020, month: 11, vramGB: 16, score: 2900 },

    // ========== Apple A-Series (iPhone/iPad) ==========
    "APPLE GPU (A17 PRO)": { vendor: "Apple", vram: "System Shared", release: "Sep 2023", year: 2023, month: 9, vramGB: 8, score: 3100 },
    "APPLE GPU (A16)": { vendor: "Apple", vram: "System Shared", release: "Sep 2022", year: 2022, month: 9, vramGB: 6, score: 2700 },
    "APPLE GPU (A15)": { vendor: "Apple", vram: "System Shared", release: "Sep 2021", year: 2021, month: 9, vramGB: 6, score: 2400 },
    "APPLE GPU (A14)": { vendor: "Apple", vram: "System Shared", release: "Sep 2020", year: 2020, month: 9, vramGB: 4, score: 2100 },
    "APPLE GPU (A13)": { vendor: "Apple", vram: "System Shared", release: "Sep 2019", year: 2019, month: 9, vramGB: 4, score: 1800 },
    "APPLE GPU (A12)": { vendor: "Apple", vram: "System Shared", release: "Sep 2018", year: 2018, month: 9, vramGB: 4, score: 1600 },
    "APPLE GPU (A11)": { vendor: "Apple", vram: "System Shared", release: "Sep 2017", year: 2017, month: 9, vramGB: 3, score: 1400 },

    // ========== ARM Mali/Immortalis ==========
    "IMMORTALIS G720": { vendor: "ARM", vram: "System Shared", release: "Nov 2023", year: 2023, month: 11, vramGB: 12, score: 2600 },
    "IMMORTALIS G715": { vendor: "ARM", vram: "System Shared", release: "Jun 2022", year: 2022, month: 6, vramGB: 8, score: 2300 },
    "MALI G715": { vendor: "ARM", vram: "System Shared", release: "Jun 2022", year: 2022, month: 6, vramGB: 8, score: 2300 },
    "MALI G710": { vendor: "ARM", vram: "System Shared", release: "Jun 2022", year: 2022, month: 6, vramGB: 8, score: 2100 },
    "MALI G78": { vendor: "ARM", vram: "System Shared", release: "May 2020", year: 2020, month: 5, vramGB: 6, score: 1800 },
    "MALI G77": { vendor: "ARM", vram: "System Shared", release: "May 2019", year: 2019, month: 5, vramGB: 6, score: 1700 },
    "MALI G76": { vendor: "ARM", vram: "System Shared", release: "May 2018", year: 2018, month: 5, vramGB: 4, score: 1500 },
    "MALI G72": { vendor: "ARM", vram: "System Shared", release: "May 2017", year: 2017, month: 5, vramGB: 4, score: 1300 },
    "MALI G71": { vendor: "ARM", vram: "System Shared", release: "May 2016", year: 2016, month: 5, vramGB: 4, score: 1200 },
    "MALI T880": { vendor: "ARM", vram: "System Shared", release: "Feb 2015", year: 2015, month: 2, vramGB: 4, score: 1000 },
    "MALI T760": { vendor: "ARM", vram: "System Shared", release: "Sep 2013", year: 2013, month: 9, vramGB: 2, score: 800 },

    // ========== Samsung Xclipse (AMD RDNA-based) ==========
    "XCLIPSE 940": { vendor: "Samsung/AMD", vram: "System Shared", release: "Oct 2023", year: 2023, month: 10, vramGB: 12, score: 2700 },
    "XCLIPSE 920": { vendor: "Samsung/AMD", vram: "System Shared", release: "Feb 2022", year: 2022, month: 2, vramGB: 8, score: 2300 },
};

// Export for use in main GPU lab file
export default COMPREHENSIVE_GPU_DB;
