const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imagesDir = path.join(__dirname, 'images');

async function optimize() {
    // Hero image: resize to 1200px wide, convert to WebP
    const heroSrc = path.join(imagesDir, 'hero.jpg');
    const heroBackup = path.join(imagesDir, 'hero-original.jpg');
    if (fs.existsSync(heroSrc)) {
        fs.copyFileSync(heroSrc, heroBackup);
        await sharp(heroSrc)
            .resize(1200, null, { withoutEnlargement: true })
            .webp({ quality: 75 })
            .toFile(path.join(imagesDir, 'hero.webp'));
        const stats = fs.statSync(path.join(imagesDir, 'hero.webp'));
        console.log(`hero.webp: ${(stats.size / 1024).toFixed(1)} KB`);
    }

    // Logo: convert to WebP
    const logoSrc = path.join(imagesDir, 'logo.png');
    const logoBackup = path.join(imagesDir, 'logo-original.png');
    if (fs.existsSync(logoSrc)) {
        fs.copyFileSync(logoSrc, logoBackup);
        await sharp(logoSrc)
            .resize(800, null, { withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(path.join(imagesDir, 'logo.webp'));
        const stats = fs.statSync(path.join(imagesDir, 'logo.webp'));
        console.log(`logo.webp: ${(stats.size / 1024).toFixed(1)} KB`);
    }

    console.log('Done!');
}

optimize().catch(console.error);
