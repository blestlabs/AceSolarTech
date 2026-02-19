#!/usr/bin/env python3
"""
Generate images for page sections that currently lack visuals.
Run: python3 scripts/generate-page-images.py
"""

import json
import os
import base64
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

secrets_path = os.path.expanduser("~/.secrets/credentials.json")
with open(secrets_path) as f:
    creds = json.load(f)
api_key = creds["api_keys"]["openai"]

from openai import OpenAI
client = OpenAI(api_key=api_key)

OUTPUT_DIR = Path(__file__).parent.parent / "public" / "images"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

STYLE = "Professional, clean, modern, warm orange (#FF6B00) and white color palette. Bright, optimistic, outdoor lighting. Indian context, Maharashtra setting. High quality, photorealistic."

IMAGES = [
    # ─── HOME PAGE ──────────────────────────────────────────────
    {
        "file": "hero-solar-home.png",
        "prompt": f"A stunning modern Indian home with gleaming blue rooftop solar panels, viewed at a slight angle. Beautiful clear blue sky, green garden, warm sunlight. The house is a typical upper-middle-class Maharashtra home with white walls and terrace. Aspirational and clean. Ultra-wide shot. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "hero-solar-home-mobile.png",
        "prompt": f"A modern Indian home with rooftop solar panels. Vertical/portrait orientation. Blue sky, warm sunlight, clean white house with solar panels visible on rooftop. Green trees around. Aspirational and inviting. Maharashtra setting. {STYLE}",
        "size": "1024x1536",
    },

    # ─── WHY US SECTION (3 trust cards) ─────────────────────────
    {
        "file": "why-free-visit.png",
        "prompt": f"A friendly Indian solar technician arriving at a customer's home for a free site visit. He's carrying a clipboard and wearing an orange-branded polo shirt. Customer greeting him at the door. Warm, trustworthy, professional. Suburban Indian house. {STYLE}",
        "size": "1024x1024",
    },
    {
        "file": "why-emi-available.png",
        "prompt": f"Illustration showing solar panel EMI/financing concept. An Indian family looking relieved and happy, with a solar panel and a simple monthly payment calendar showing small equal amounts. Rupee symbol. Affordable and accessible feeling. Light background. {STYLE}",
        "size": "1024x1024",
    },
    {
        "file": "why-warranty-25year.png",
        "prompt": f"Illustration of a 25-year solar panel warranty concept. A strong shield protecting solar panels with '25 YEARS' text. Timeline showing decades of reliable performance. Durability, trust, reliability visual. Blue and orange tones. {STYLE}",
        "size": "1024x1024",
    },

    # ─── SCHEMES SECTION ────────────────────────────────────────
    {
        "file": "scheme-pm-surya-ghar.png",
        "prompt": f"Indian government PM Surya Ghar scheme illustration. A rooftop solar installation on a typical Indian house with an Indian flag or government emblem subtly visible. Rupee symbol showing subsidy discount. Bright, optimistic, shows government support for solar. {STYLE}",
        "size": "1024x1024",
    },
    {
        "file": "scheme-kusum-yojana.png",
        "prompt": f"KUSUM Yojana illustration for Indian farmers. A solar pump in a green agricultural field in Maharashtra. Indian farmer looking satisfied. Solar panels powering a water pump. Crops growing, water flowing. Government subsidy visual. {STYLE}",
        "size": "1024x1024",
    },

    # ─── ABOUT PAGE ─────────────────────────────────────────────
    {
        "file": "about-team.png",
        "prompt": f"Professional team photo of 6 Indian solar installation technicians and sales staff standing together in front of a delivery truck with solar panels. Orange branded uniforms/shirts. Confident, professional, diverse team. Dhule/Maharashtra setting. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "about-mission.png",
        "prompt": f"Inspiring panoramic image of Maharashtra countryside transitioning from traditional to solar-powered. Left side shows traditional village, right side shows the same area with solar panels on every roof and solar-powered street lights. Sunset golden hour. Progress and hope. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "about-step-whatsapp.png",
        "prompt": f"An Indian customer happily sending a WhatsApp message on their smartphone. The screen shows a chat with a solar company. Green WhatsApp interface visible. Simple, clean, friendly. Indoor setting, living room of an Indian home. {STYLE}",
        "size": "1024x1024",
    },
    {
        "file": "about-step-site-visit.png",
        "prompt": f"Two Indian solar technicians on a rooftop doing a site assessment. One is using a measuring tape, the other is checking roof angle with a tool. The homeowner is watching and asking questions. Indian residential rooftop with water tanks. Clear blue sky. {STYLE}",
        "size": "1024x1024",
    },
    {
        "file": "about-step-installation.png",
        "prompt": f"Professional solar panel installation in progress on an Indian rooftop. Three workers mounting solar panels on aluminum frames. Tools, wiring, and inverter visible. Almost finished — one panel being placed. Sense of completion and quality workmanship. {STYLE}",
        "size": "1024x1024",
    },

    # ─── DEAL CATEGORY IMAGES ───────────────────────────────────
    {
        "file": "deal-residential.png",
        "prompt": f"A beautiful Indian home with newly installed rooftop solar panels. Happy family on the balcony. Orange discount badge overlay area in corner. Bright and inviting. Residential solar deal image. {STYLE}",
        "size": "1024x1024",
    },
    {
        "file": "deal-farm.png",
        "prompt": f"Indian farmland in Maharashtra with solar panels powering an irrigation pump. Green crops, water flowing. A farmer smiling. Agricultural solar deal image. Practical and valuable. {STYLE}",
        "size": "1024x1024",
    },
    {
        "file": "deal-commercial.png",
        "prompt": f"Commercial building in India with a large rooftop solar array. Office building or factory with hundreds of solar panels in neat rows. Professional, large-scale. Commercial solar deal image. {STYLE}",
        "size": "1024x1024",
    },

    # ─── CALCULATOR PAGE ────────────────────────────────────────
    {
        "file": "calculator-hero.png",
        "prompt": f"Concept illustration of solar savings calculation. A house with solar panels, connected to a digital display showing rupee savings going up. Graph trending upward. Calculator or meter visual. Indian home style. Clean, infographic feel. {STYLE}",
        "size": "1536x1024",
    },

    # ─── SERVICE AREA ───────────────────────────────────────────
    {
        "file": "service-area-maharashtra.png",
        "prompt": f"Beautiful aerial view of Maharashtra with several towns visible, each having solar panels on rooftops. Map-like perspective showing Dhule as the central hub with lines connecting to other cities. Artistic, modern cartographic style with real landscape. {STYLE}",
        "size": "1536x1024",
    },

    # ─── ADDITIONAL SOCIAL/MARKETING ────────────────────────────
    {
        "file": "stock/testimonial-bg-1.png",
        "prompt": f"Happy Indian family of four standing on their terrace next to rooftop solar panels, giving thumbs up. Natural, candid feel. Warm evening light. Dhule-style Indian home. Testimonial/review photo feel. {STYLE}",
        "size": "1024x1024",
    },
    {
        "file": "stock/testimonial-bg-2.png",
        "prompt": f"Indian farmer standing proudly next to his solar-powered water pump in a lush green field. His crops are thriving. He's smiling at the camera. Natural outdoor lighting. Authentic Maharashtra farmland. Testimonial photo. {STYLE}",
        "size": "1024x1024",
    },
    {
        "file": "stock/testimonial-bg-3.png",
        "prompt": f"Indian shop owner standing in front of his store which has solar panels on the roof. Commercial area in a small Indian town. The shop is well-lit with solar power. Proud small business owner. {STYLE}",
        "size": "1024x1024",
    },
    {
        "file": "stock/before-after-electricity.png",
        "prompt": f"Split image comparison of Indian home electricity experience. Left (dark, frustrated): family in dim light, high electricity bill on table, sweating without fan. Right (bright, happy): same family in well-lit home, fan running, tiny bill, solar panels visible through window. Dramatic contrast. {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "stock/solar-savings-piggybank.png",
        "prompt": f"Creative illustration of a piggy bank shaped like a house with solar panels on its roof. Gold coins flowing in. Rupee symbols. Savings and investment concept for solar. Clean white background. Fun and engaging. {STYLE}",
        "size": "1024x1024",
    },
    {
        "file": "stock/night-solar-home.png",
        "prompt": f"An Indian home at night beautifully lit by solar-powered lights. Solar panels visible on rooftop under a starry sky. Warm interior glow through windows. Peaceful neighborhood. Solar power even at night concept (battery storage). {STYLE}",
        "size": "1536x1024",
    },
    {
        "file": "stock/solar-installation-timelapse.png",
        "prompt": f"Four-panel sequence showing solar installation progress on an Indian rooftop: (1) Empty rooftop, (2) Mounting structure installed, (3) Panels being placed, (4) Complete system with inverter. Time-lapse style, before-during-after. Clean grid layout. {STYLE}",
        "size": "1536x1024",
    },
]

def generate_image(img_config, base_dir):
    filepath = base_dir / img_config["file"]
    filepath.parent.mkdir(parents=True, exist_ok=True)

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

        image_data = result.data[0].b64_json
        if image_data:
            img_bytes = base64.b64decode(image_data)
            with open(filepath, "wb") as f:
                f.write(img_bytes)
            size_kb = len(img_bytes) / 1024
            print(f"  DONE: {img_config['file']} ({size_kb:.0f} KB)")
            return img_config["file"], "success"

        print(f"  FAIL: {img_config['file']} - no image data")
        return img_config["file"], "failed"

    except Exception as e:
        print(f"  ERROR: {img_config['file']} - {str(e)[:100]}")
        return img_config["file"], f"error: {str(e)[:80]}"

def main():
    print("=" * 60)
    print("AceSolarTech Page Images Generator (gpt-image-1)")
    print(f"Total: {len(IMAGES)} images")
    print("=" * 60)

    results = {"success": 0, "skipped": 0, "failed": 0}

    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {
            executor.submit(generate_image, img, OUTPUT_DIR): img
            for img in IMAGES
        }
        for future in as_completed(futures):
            filename, status = future.result()
            if status == "success":
                results["success"] += 1
            elif status == "skipped":
                results["skipped"] += 1
            else:
                results["failed"] += 1

    print(f"\n{'=' * 60}")
    print(f"DONE: {results['success']} generated, {results['skipped']} skipped, {results['failed']} failed")
    print(f"{'=' * 60}")

if __name__ == "__main__":
    main()
