# Questions-Answers-Services

#Build SQL Container:
docker build -f mysql-dockerfile -t druplall/mysql .

#Start SQL Container:
docker run -d --net=sdcNetwork --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 druplall/mysql

# Prequisite to load data
Bash into mysql container and install vim
MySQL use this system variable to control where you can import you file
SHOW VARIABLES LIKE "secure_file_priv"
Change file: /etc/mysql/my.cnf
TO: secure_file_priv=/var/lib/mysql-files/

Vim will allow us to update the read location of the files to perform the load


#Build Node Container:
docker build -f node-dockerfile -t druplall/node .

#Start Node Container:
docker run --net=sdcNetwork --name node -p 3000:3000 -v $(pwd):/var/www -w "/var/www" druplall/node


# Create Redis container
docker run --net=sdcNetwork --name cache -p 6379:6379 redis