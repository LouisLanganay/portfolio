# 🔐 Configuration Sécurisée de l'API Cal.com

## ⚠️ **IMPORTANT : Sécurité**

La clé API Cal.com est maintenant **sécurisée côté serveur** et n'est plus exposée côté client.

## 🛠️ **Configuration**

### 1. **Variables d'Environnement**

Créez un fichier `.env.local` à la racine de votre projet :

```env
# Cal.com API (CÔTÉ SERVEUR SEULEMENT)
CAL_API_KEY=votre_clé_api_cal_ici

# NE PAS utiliser NEXT_PUBLIC_ - la clé resterait exposée !
```

### 2. **Obtenir votre Clé API Cal.com**

1. Allez sur https://developer.cal.com/api-keys
2. Connectez-vous à votre compte Cal.com
3. Créez une nouvelle clé API
4. Copiez la clé dans votre `.env.local`

### 3. **Redémarrer le Serveur**

```bash
npm run dev
# ou
yarn dev
```

### 4. **Tester la Configuration**

Testez votre configuration en visitant :
```
http://localhost:3000/api/cal/test
```

Vous devriez voir :
```json
{
  "success": true,
  "hasApiKey": true,
  "apiKeyLength": 64,
  "message": "Clé API Cal.com configurée correctement"
}
```

## 🔒 **Architecture Sécurisée**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Next.js API   │    │   Cal.com API   │
│   (Client)      │───▶│   Route         │───▶│   (Serveur)     │
│                 │    │   /api/cal/slots│    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        │                       │                       │
        │              ┌────────▼────────┐              │
        │              │  CAL_API_KEY    │              │
        │              │  (Env Server)   │              │
        │              └─────────────────┘              │
        │                                               │
        │              ┌─────────────────┐              │
        │              │   Clé API       │              │
        │              │   JAMAIS        │              │
        │              │   exposée !     │              │
        │              └─────────────────┘              │
```

## 📁 **Fichiers Créés**

- `app/api/cal/slots/route.ts` - Route API sécurisée
- `app/api/cal/test/route.ts` - Route de test de configuration
- `lib/hooks/useCalSlots.ts` - Hook client (sans clé API)
- `lib/config/cal-api.ts` - Configuration centralisée

## 🚀 **Utilisation**

Le hook `useCalSlots` fonctionne exactement pareil, mais appelle maintenant votre route API sécurisée :

```tsx
const { slots, isLoading, error } = useCalSlots({
  username: 'louislanganay',
  eventTypeSlug: '30min',
  daysAhead: 7
})
```

## ✅ **Avantages de cette Approche**

1. **🔒 Sécurisé** : Clé API jamais exposée côté client
2. **🚀 Performant** : Cache possible côté serveur
3. **🛡️ Contrôlé** : Validation des paramètres côté serveur
4. **📊 Monitoring** : Logs côté serveur pour le debugging
5. **🔄 Flexible** : Facile d'ajouter de la logique métier

## 🐛 **Dépannage**

### **Erreur "Configuration API manquante"**
- Vérifiez que `CAL_API_KEY` est dans `.env.local`
- **IMPORTANT** : Le fichier doit être à la racine du projet
- Redémarrez votre serveur Next.js
- Testez avec `/api/cal/test`

### **Erreur "Paramètres manquants"**
- Vérifiez que tous les paramètres sont passés au hook

### **Erreur Cal.com API**
- Vérifiez que votre clé API est valide
- Vérifiez les logs du serveur Next.js
- Testez votre clé directement sur https://developer.cal.com/api-docs

### **Erreur 500 persistante**
1. Vérifiez les logs côté serveur
2. Testez la configuration avec `/api/cal/test`
3. Vérifiez que le fichier `.env.local` est bien lu
4. Redémarrez complètement votre serveur

## 🔍 **Logs et Debugging**

Les erreurs sont maintenant loggées côté serveur avec des emojis pour faciliter le debugging :

- 🔍 Paramètres reçus
- 🔑 Vérification de la clé API
- 🌐 URL de l'API Cal.com
- 📡 Réponse de Cal.com
- ✅ Données reçues
- ❌ Erreurs
- 💥 Erreurs fatales

## 📋 **Checklist de Configuration**

- [ ] Fichier `.env.local` créé à la racine
- [ ] `CAL_API_KEY=votre_clé` ajouté
- [ ] Serveur redémarré
- [ ] `/api/cal/test` retourne `success: true`
- [ ] Popup affiche les créneaux disponibles

---

**Votre clé API Cal.com est maintenant 100% sécurisée ! 🎉**
