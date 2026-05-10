# Imagen base oficial Node.js versión LTS liviana
FROM node:18-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias primero 
COPY package.json .

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponemos el puerto 80
EXPOSE 80

# Comando de inicio
CMD ["node", "server.js"]
