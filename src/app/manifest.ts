import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        "name": "CasalFuturo",
        "short_name": "Futuro",
        "description": "App de Investimento para Casais",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#000000",
        "icons": [
            {
                "src": "/icons/logo.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/icons/logo.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ]
    }

}