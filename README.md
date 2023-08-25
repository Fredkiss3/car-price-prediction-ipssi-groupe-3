# car-price-prediction-ipssi-groupe-3

[Lien du diaporama](https://testipformation-my.sharepoint.com/:p:/g/personal/m_tarhoult_ecole-ipssi_net/EbC1ND677kxNpbSfeQA6xbcBIPEM23j927lIqrTc3BUMBw?e=D25ncl)

[Lien du Trello](https://trello.com/b/DOmWmeJP/groupe-3-previously-x-car-price-prediction)

## 🧐 Structure du projet

Un coup d'œil rapide sur les fichiers et répertoires de premier niveau que vous verrez dans ce projet.

    .
    ├── backend
    ├── frontend
    ├── web-scraping
    └── les_trois_models.ipynb

1. **`backend`**: Ce dossier contient l'application django

2. **`frontend`**: Ce dossier contient le frontend de l'application

3. **`web-scraping`**: Ce dossier contient les scripts de scrapping

4. **`les_trois_models.ipynb`**: Ce fichier contient le notebook utilisé pour entrainer les modèles

## 🚀 Comment travailler sur le projet ?

1. **Lancer l'application django.**

   ```shell
    cd backend # aller vers le dossier django
    source venv/bin/activate # activer l'environement python
    pip install -r requirements.txt # installer les packages
    python manage.py runserver # lancer le serveur
   ```

   Un serveur sera ouvert à http://localhost:8000

2. **Lancer l'application frontend** :

   ```shell
    cd frontend # aller vers le dossier react
    npm install # installer les packages
    npm run dev # lancer le serveur
   ```

   Ouvrez le serveur affiché sur la console et de la vous pouvez tester.
