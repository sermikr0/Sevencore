# Sevencore Attendance: one container = admin/manager panel + Telegram Mini App + bot + PostgREST.
# The database is external (DATABASE_URL), e.g. Render Postgres. See render.yaml.
FROM postgrest/postgrest:v12.2.12 AS postgrest

FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PUBLIC=1 PORT=10000
WORKDIR /app
COPY --from=postgrest /bin/postgrest /usr/local/bin/postgrest
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY server ./server
COPY miniapp ./miniapp
COPY panel ./panel
COPY models ./models
COPY db/01_schema.sql ./db/01_schema.sql
COPY deploy ./deploy
RUN useradd --system --uid 10001 app
USER app
EXPOSE 10000
CMD ["python", "deploy/run.py"]
