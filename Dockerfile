FROM hub-dev.hexin.cn/frontend/web-basic-image:v1.0.0
RUN mkdir -p /var/www/html/

ENV ENABLE_MONGODB=false \
    ENABLE_REDIS=false \
    ENABLE_MEMCACHED=false \
    ENABLE_XDEBUG=false \
    ENABLE_FPM=false