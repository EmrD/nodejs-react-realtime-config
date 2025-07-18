const express = require('express')
const app = express()
const path = require("path")
const port = 3000

app.use(express.json())

let config = {
    price_label: "Ücretler",
    choose_label: "Plan seçimi",
    choose_description: "Size uygun olan planımızı seçin.",
    selectLabel: "Planı Seç",
    tiers: [
        {
            name: 'Hobi',
            id: 'tier-hobi',
            href: '#hobby',
            priceMonthly: '129 TL',
            pricePeriod: "Ay",
            description: "Hobileriniz için ideal plan.",
            features: ['25 ürün', '100 kullanıcı', 'Analiz', '24 saat ulaşılabilir destek'],
            featured: false,
        },
        {
            name: 'Kurumsal',
            id: 'tier-kurumsal',
            href: '#enterprise',
            priceMonthly: '1999 TL',
            pricePeriod: "Yıl",
            description: 'İşletmeniz için uygun planlar.',
            features: [
                'Limitsiz ürün',
                'Limitsiz abone',
                'Analiz',
                'Ulaşılabilir destek',
                'Otomasyon',
                'Özel entegrasyonlar',
            ],
            featured: true,
        },
    ]
}

app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/config', (req, res) => {
  res.send(config)
})

app.post('/api/config', (req, res) => {
  const newConfig = req.body

  if (!newConfig || typeof newConfig !== 'object') {
    return res.status(400).send({ error: 'Geçersiz yapı' })
  }

  config = newConfig
  res.send({ message: 'Config güncellendi', config })
})

app.listen(port, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${port}`)
})