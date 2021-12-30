FROM ubuntu:latest

RUN apt-get update && apt-get install -y locales wget && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8

# Set up conda
RUN wget --quiet https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh
RUN /bin/bash ~/miniconda.sh -b && echo ". /root/miniconda3/etc/profile.d/conda.sh" >> ~/.bashrc && rm ~/miniconda.sh

# Install LevelDB
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Geneva
RUN apt-get install -y libsnappy-dev curl build-essential cmake gcc sqlite3 git
ARG LEVEL_DB_VER=1.22
RUN cd ~ && wget https://github.com/google/leveldb/archive/${LEVEL_DB_VER}.tar.gz -O ./leveldb.tar.gz && \
    tar xvf leveldb.tar.gz && cd leveldb*/ && \
    mkdir -p build && cd build && \
    cmake -DCMAKE_BUILD_TYPE=Release .. && cmake --build . && rm -rf ~/leveldb.tar.gz

# Create conda environment and install required packages for cr5-lib
RUN . ~/.bashrc && conda create -n cr5-demo python=3.6 -y && conda activate cr5-demo && \
    pip install nltk numpy plyvel && \
    python -c "import nltk; nltk.download('punkt')" && \
    conda install -c pytorch faiss-cpu -y && \
    pip install "git+https://github.com/epfl-dlab/cr5-lib"

RUN echo "conda activate cr5-demo" >> ~/.bashrc

# Install required packages for cr5-demo backend
RUN . ~/.bashrc && pip install Flask Flask-Cors Flask-Inputs Flask-Limiter flasgger

ENV LEVEL_DB_DIR=/data/leveldb
ENV SEARCH_INDEXES_DIR=/data/search_indexes
ENV APP_HOST=0.0.0.0
RUN git clone https://github.com/epfl-dlab/cr5-demo

WORKDIR /cr5-demo/backend
CMD ["/bin/bash"]