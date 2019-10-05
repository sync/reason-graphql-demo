FROM node:10

LABEL repository="https://github.com/sync/reason-graphql-demo"
LABEL homepage="http://github.com/sync"
LABEL maintainer="sync@github.com>"

LABEL com.github.actions.name="GitHub Action for cypress"
LABEL com.github.actions.description="Wraps the yarn CLI to enable common yarn commands with extra stuff added for cypress."
LABEL com.github.actions.icon="package"
LABEL com.github.actions.color="brown"

# "fake" dbus address to prevent errors
# https://github.com/SeleniumHQ/docker-selenium/issues/87
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null

# For Cypress
ENV CI=1

# https://github.com/GoogleChrome/puppeteer/blob/9de34499ef06386451c01b2662369c224502ebe7/docs/troubleshooting.md#running-puppeteer-in-docker
RUN apt-get update && apt-get install -y wget --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get -y install procps git less openssh-client python-dev python-pip \
    && apt-get -y install libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 xvfb \
    && apt-get -y install curl groff jq zip libpng-dev \
    && apt-get install -y dbus-x11 google-chrome-unstable \
      --no-install-recommends

RUN npm install -g yarn
RUN npm install -g --unsafe-perm now

# It's a good idea to use dumb-init to help prevent zombie chrome processes.
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

COPY "entrypoint.sh" "/entrypoint.sh"
ENTRYPOINT ["dumb-init", "--", "/entrypoint.sh"]
CMD ["help"]
