FROM tiangolo/uvicorn-gunicorn-fastapi:python3.10

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

ARG UID
ARG GID

RUN echo $GID
RUN echo $UID
RUN groupadd -g $GID appgroup
RUN useradd -u $UID -g $GID -ms "/bin/bash" appuser

RUN chown -R appuser:appgroup /app

USER appuser

COPY src /app/src
COPY main.py /app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
