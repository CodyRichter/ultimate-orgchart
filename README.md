In order to run the app using Docker:

1. Download Docker Desktop from https://www.docker.com/products/docker-desktop
2. Make sure you have Angular, Nest, and MongoDB installed
3. Open the Docker app
4. Open the 404-Brain-Not-Found project folder in terminal
5. Type "docker-compose build" and let the application set itself up (should take around 10 minutes)
6. Type "docker-compose up" and wait for the program to compile
7. In order to open mongo shell if needed, type "sudo docker exec -it test bash" if on Linux, and "docker exec -it mongodb bash" if on Windows in terminal
8. Then, type "mongo" in terminal and the shell should open
