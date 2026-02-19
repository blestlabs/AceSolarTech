#!/usr/bin/env python3
"""
Generate all blog and stock images for AceSolarTech using OpenAI gpt-image-1.
Run: python3 scripts/generate-blog-images.py
"""

import json
import os
import sys
import base64
import time
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

# Load API key
secrets_path = os.path.expanduser("~/.secrets/credentials.json")
with open(secrets_path) as f:
    creds = json.load(f)
api_key = creds["api_keys"]["openai"]

from openai import OpenAI
client = OpenAI(api_key=api_key)

OUTPUT_DIR = Path(__file__).parent.parent / "public" / "images" / "blog"
STOCK_DIR = Path(__file__).parent.parent / "public" / "images" / "stock"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
STOCK_DIR.mkdir(parents=True, exist_ok=True)

# Style guide for consistency
STYLE = "Professional, clean, modern illustration style with warm orange (#FF6B00) and white color palette. Bright, optimistic, outdoor lighting. Indian context, Maharashtra setting. High quality, photorealistic where appropriate."

# ─── BLOG IMAGES (22) ──────────────────────────────────────────────

BLOG_IMAGES = [
    # Blog 1: PM Surya Ghar Yojana
    {
        "file": "pm-surya-ghar-guide.png",
        "prompt": f"A beautiful modern Indian house in Maharashtra with rooftop solar panels gleaming in sunlight. Indian flag subtly visible. Family standing in front smiling. Government subsidy document visible. Blue sky with a few clouds. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "pm-surya-ghar-subsidy-table.png",
        "prompt": f"Clean infographic showing solar subsidy tiers for Indian homes. Three houses of increasing size (small 1kW, medium 2kW, large 3kW) with rupee symbols and solar panels. Green checkmarks. Government building icon. Clean white background with orange accents. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "pm-surya-ghar-application-process.png",
        "prompt": f"Step-by-step flowchart infographic for solar subsidy application in India. 7 connected steps shown as icons: Register online, Submit documents, Site inspection, Install panels, Connect meter, Upload photos, Receive subsidy. Horizontal flow with arrows. Clean design. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "pm-surya-ghar-before-after.png",
        "prompt": f"Split image comparison: Left side shows a high electricity bill with a worried Indian family, dark tones. Right side shows same family happy with solar panels on roof and a much smaller bill, bright sunny tones. Before/After solar installation. {STYLE}",
        "size": "1536x1024",
    },

    # Blog 2: KUSUM Yojana
    {
        "file": "kusum-yojana-solar-pump.png",
        "prompt": f"Indian farmer in Maharashtra standing proudly next to a solar-powered water pump in a green agricultural field. Solar panels mounted on a ground structure powering the pump. Crops growing, water flowing through irrigation channels. Clear blue sky. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "kusum-solar-pump-field.png",
        "prompt": f"Wide panoramic view of a Maharashtra farm field with multiple solar panels powering an agricultural water pump. Sugarcane or cotton crops in background. Traditional Indian farmland with modern solar technology. Golden hour lighting. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "kusum-subsidy-breakdown.png",
        "prompt": f"Clean infographic showing KUSUM solar pump subsidy breakdown in India. Pie chart or bar chart showing Central Government 30%, State Government 60%, Farmer 10%. Solar pump illustrations. Rupee symbols. Green and orange color scheme on white background. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "kusum-diesel-vs-solar-comparison.png",
        "prompt": f"Side-by-side comparison illustration: Left shows an old diesel pump with black smoke, fuel cans, and high cost indicators. Right shows a clean solar pump with solar panels, green environment, and savings indicators. Versus symbol in middle. Indian agricultural setting. {STYLE}",
        "size": "1536x1024",
    },

    # Blog 3: Rooftop Solar Guide
    {
        "file": "rooftop-solar-installation-guide.png",
        "prompt": f"Professional solar panel installation team working on a rooftop in India. Workers wearing safety gear installing blue solar panels. Modern Indian house with terrace. Tools and equipment visible. Bright sunny day. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "solar-panel-types-comparison.png",
        "prompt": f"Educational comparison of 4 types of solar panels arranged side by side: Monocrystalline (dark black), Polycrystalline (blue multi-crystal), Thin-Film (dark uniform), Bifacial (transparent back). Labels under each. Clean white background with technical annotations. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "rooftop-solar-cost-breakdown.png",
        "prompt": f"Clean infographic showing cost breakdown of a rooftop solar system in India. Stacked bar chart or pie chart with segments: Solar Panels 50%, Inverter 20%, Mounting 10%, Wiring 10%, Labor 10%. Rupee symbols. Orange and white color scheme. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "solar-installation-process-steps.png",
        "prompt": f"Illustrated step-by-step solar installation process for Indian homes. 8 steps in a horizontal timeline: Site Survey, System Design, Permits, Procurement, Mounting Structure, Panel Installation, Wiring & Inverter, Commissioning. Clean icons for each step. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "net-metering-diagram.png",
        "prompt": f"Clear technical diagram showing how net metering works. Solar panels on house rooftop connected to a bidirectional meter, which connects to the power grid. Arrows showing electricity flow both ways - export during day, import at night. Indian house style. {STYLE}",
        "size": "1536x1024",
    },

    # Blog 4: Net Metering
    {
        "file": "net-metering-maharashtra.png",
        "prompt": f"Modern Indian home in Maharashtra with rooftop solar panels and a visible bidirectional electricity meter on the wall. Power lines connecting to the grid. Daytime scene with sun shining. MSEDCL-style meter box. Clean, professional look. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "net-metering-how-it-works-diagram.png",
        "prompt": f"Educational infographic diagram showing net metering flow. Sun icon at top, solar panels on house, bidirectional meter in center, power grid on right. Two arrow paths: green arrow 'Export to Grid' and red arrow 'Import from Grid'. Day/Night cycle shown. Clean white background. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "msedcl-bill-before-after.png",
        "prompt": f"Side-by-side comparison of Indian MSEDCL electricity bills. Left: High bill showing Rs 5000+ with red highlights. Right: Low bill after solar showing Rs 500 with green highlights and solar panel icon. 'SAVE 86%' badge. Realistic Indian electricity bill format. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "bidirectional-meter.png",
        "prompt": f"Close-up photograph of a modern bidirectional electricity meter (net meter) installed on an Indian house wall. Digital display showing import/export readings. Wires connecting to both solar system and grid. Clean white wall mounting. Professional installation. {STYLE}",
        "size": "1536x1024",
    },

    # Blog 5: Maintenance
    {
        "file": "solar-panel-maintenance-cleaning.png",
        "prompt": f"Indian technician cleaning solar panels on a rooftop with a soft brush and water spray. Wearing safety gear. Some panels are dusty (before) and some are gleaming clean (after). Bright sunny day in Maharashtra. Professional maintenance service. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "solar-cleaning-techniques.png",
        "prompt": f"Instructional illustration showing correct solar panel cleaning techniques. 4 panels: soft brush cleaning, water spray, avoiding harsh chemicals (X mark), gentle wiping. Do's and Don'ts visual guide. Clean educational style. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "seasonal-maintenance-calendar.png",
        "prompt": f"Colorful 12-month maintenance calendar infographic for solar panels in India. Monsoon months (June-Sept) highlighted in blue, Summer (Mar-May) in orange, Winter (Nov-Feb) in cool tones. Icons for each season's maintenance tasks. Clean grid layout. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "solar-panel-inspection-checklist.png",
        "prompt": f"Professional solar panel inspection checklist illustration. A technician with clipboard inspecting solar panels. Checkboxes visible: panel condition, wiring, inverter LEDs, mounting bolts, shade analysis. Professional, clean infographic style. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "solar-monitoring-dashboard.png",
        "prompt": f"Modern solar energy monitoring dashboard displayed on a smartphone and tablet. Graphs showing daily power generation, monthly savings in rupees, system health status. Green indicators. Clean UI design with solar icons. Indian context. {STYLE}",
        "size": "1536x1024",
    },
]

# ─── STOCK IMAGES FOR FUTURE USE (15) ──────────────────────────────

STOCK_IMAGES = [
    {
        "file": "happy-family-solar-home.png",
        "prompt": f"Happy Indian family of four standing in front of their modern home with rooftop solar panels. Father, mother, and two children smiling. Green garden, blue sky. Middle-class Indian home in Maharashtra. Warm and inviting. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "solar-team-installation.png",
        "prompt": f"Team of 4 Indian solar installation technicians in orange branded uniforms carrying solar panels on a rooftop. Professional, skilled, confident. Safety helmets and gear. Modern Indian building. Blue sky background. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "commercial-solar-factory.png",
        "prompt": f"Large commercial solar panel array on the rooftop of an Indian industrial factory building. Hundreds of panels in neat rows. Factory chimney visible. Industrial area in Maharashtra. Aerial perspective. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "solar-street-lights-village.png",
        "prompt": f"Solar-powered street lights illuminating a village road in rural Maharashtra, India at dusk. LED lights on solar poles. Village houses and trees in background. Clean, safe, well-lit road. Twilight sky with orange and purple tones. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "solar-water-heater-rooftop.png",
        "prompt": f"Solar water heater system installed on an Indian home rooftop. Evacuated tube collector type, clearly visible. Blue sky, terrace with clothes line. Typical Indian middle-class rooftop scene. Clean and professional installation. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "farmer-solar-pump-irrigation.png",
        "prompt": f"Indian farmer in traditional Maharashtra clothing operating a solar-powered irrigation pump. Water flowing into crop field channels. Solar panels on ground mount nearby. Lush green crops. Sunny day. Rural Maharashtra landscape. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "solar-carport-parking.png",
        "prompt": f"Modern solar carport/parking structure with solar panels on top and cars parked underneath. Indian commercial setting — office building or mall parking lot. Shade and power generation. Clean modern design. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "solar-home-lights-interior.png",
        "prompt": f"Interior of an Indian home beautifully lit by solar-powered LED lights during evening. Family sitting together in living room. Warm lighting, cozy atmosphere. TV and fan running. Modern Indian middle-class home. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "maharashtra-solar-landscape.png",
        "prompt": f"Scenic panoramic view of Maharashtra countryside with a large solar farm in the foreground. Rows of solar panels stretching across rolling hills. Sahyadri mountains in distant background. Blue sky with scattered clouds. Golden hour lighting. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "emi-solar-financing.png",
        "prompt": f"Illustration of solar panel financing concept. Indian family looking at a solar panel with EMI payment plan visible. Calculator, rupee coins, monthly installment chart. Affordable, accessible messaging. Light and optimistic mood. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "government-subsidy-filing.png",
        "prompt": f"Indian solar company representative helping a customer fill out government subsidy application forms. Office setting with documents, laptop showing government portal. Professional, helpful, trustworthy. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "solar-panel-warranty-25year.png",
        "prompt": f"Illustration showing the 25-year journey of a solar panel. Timeline from Year 1 to Year 25 with the panel still performing at 80%+. Warranty shield icon. Durability and reliability messaging. Clean infographic style. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "dhule-city-solar.png",
        "prompt": f"Aerial view of Dhule city in Maharashtra, India with multiple buildings having rooftop solar panels. Mix of traditional and modern architecture. Solar panels visible on homes, shops, and commercial buildings. Bright sunny day. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "social-media-banner-solar.png",
        "prompt": f"Professional social media banner for a solar company. Orange and white color scheme (#FF6B00). Solar panels with sun rays. Text area on right side (blank for overlay). Clean, modern, vibrant. Indian market targeting. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "whatsapp-status-solar-offer.png",
        "prompt": f"Vertical WhatsApp status image for solar company. Bright orange background (#FF6B00) with a rooftop solar panel image. Space for text overlay. Rupee symbol and percentage discount badge. Exciting, promotional, eye-catching. {STYLE}",
        "size": "1024x1536",
    },
]

def generate_image(img_config, output_dir):
    """Generate a single image and save it."""
    filepath = output_dir / img_config["file"]

    # Skip if already exists
    if filepath.exists() and filepath.stat().st_size > 10000:
        print(f"  SKIP (exists): {img_config['file']}")
        return img_config["file"], "skipped"

    try:
        print(f"  GENERATING: {img_config['file']}...")
        result = client.images.generate(
            model="gpt-image-1",
            prompt=img_config["prompt"],
            size=img_config.get("size", "1536x1024"),
            quality="high",
            n=1,
        )

        # gpt-image-1 returns b64_json by default
        image_data = result.data[0].b64_json
        if image_data:
            img_bytes = base64.b64decode(image_data)
            with open(filepath, "wb") as f:
                f.write(img_bytes)
            size_kb = len(img_bytes) / 1024
            print(f"  DONE: {img_config['file']} ({size_kb:.0f} KB)")
            return img_config["file"], "success"
        else:
            # Fallback to URL if b64 not available
            url = result.data[0].url
            if url:
                import urllib.request
                urllib.request.urlretrieve(url, str(filepath))
                print(f"  DONE (url): {img_config['file']}")
                return img_config["file"], "success"

        print(f"  FAIL: {img_config['file']} - no image data")
        return img_config["file"], "failed"

    except Exception as e:
        print(f"  ERROR: {img_config['file']} - {str(e)[:100]}")
        return img_config["file"], f"error: {str(e)[:80]}"

def main():
    print("=" * 60)
    print("AceSolarTech Image Generator (gpt-image-1)")
    print("=" * 60)

    all_images = []

    # Blog images
    print(f"\n--- BLOG IMAGES ({len(BLOG_IMAGES)}) ---")
    print(f"Output: {OUTPUT_DIR}\n")

    results = {"success": 0, "skipped": 0, "failed": 0}

    # Generate blog images with 3 parallel threads
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {
            executor.submit(generate_image, img, OUTPUT_DIR): img
            for img in BLOG_IMAGES
        }
        for future in as_completed(futures):
            filename, status = future.result()
            if status == "success":
                results["success"] += 1
            elif status == "skipped":
                results["skipped"] += 1
            else:
                results["failed"] += 1

    print(f"\nBlog images: {results['success']} generated, {results['skipped']} skipped, {results['failed']} failed")

    # Stock images
    print(f"\n--- STOCK IMAGES ({len(STOCK_IMAGES)}) ---")
    print(f"Output: {STOCK_DIR}\n")

    stock_results = {"success": 0, "skipped": 0, "failed": 0}

    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {
            executor.submit(generate_image, img, STOCK_DIR): img
            for img in STOCK_IMAGES
        }
        for future in as_completed(futures):
            filename, status = future.result()
            if status == "success":
                stock_results["success"] += 1
            elif status == "skipped":
                stock_results["skipped"] += 1
            else:
                stock_results["failed"] += 1

    print(f"\nStock images: {stock_results['success']} generated, {stock_results['skipped']} skipped, {stock_results['failed']} failed")

    # Summary
    total = results["success"] + stock_results["success"]
    print(f"\n{'=' * 60}")
    print(f"TOTAL: {total} images generated successfully")
    print(f"Blog: {OUTPUT_DIR}")
    print(f"Stock: {STOCK_DIR}")
    print(f"{'=' * 60}")

if __name__ == "__main__":
    main()
