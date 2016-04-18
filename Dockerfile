FROM node
MAINTAINER sehqlr

VOLUME /poppins /poppins-mantl-testing
COPY mantl-testing.js /poppins-mantl-testing/mantl-testing.js

WORKDIR /poppins
RUN npm install -g mary-poppins poppins-exec \
	&& mary-poppins init

