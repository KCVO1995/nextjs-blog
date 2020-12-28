This is a starter template for [Learn Next.js](https://nextjs.org/learn).
 
### 启动数据库
```
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

### 进入虚拟机
```
docker exec -it id bash
```

### 连接数据库
```
psql -U blog
```

### 新建数据库
```
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

### 自动化部署
```
ssh lyh@wzh 'bash -s' < bin/deploy.sh 
```

