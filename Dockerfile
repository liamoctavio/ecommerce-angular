FROM nginx:alpine

# Copiar la build generada desde la carpeta browser
COPY dist/ecommerce-angular/browser/ /usr/share/nginx/html/

# Reemplaza la config por defecto de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
