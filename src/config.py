"""Application configuration management."""
from functools import lru_cache
from typing import Optional
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings from environment variables."""

    # Application
    app_name: str = "Healthcare Analytics Engine"
    app_version: str = "1.0.0"
    environment: str = Field(default="development")
    debug: bool = Field(default=False)
    log_level: str = Field(default="INFO")

    # Database
    database_url: str
    database_pool_size: int = Field(default=20, ge=1, le=100)
    database_max_overflow: int = Field(default=40, ge=1, le=200)
    database_echo: bool = Field(default=False)

    # Redis
    redis_url: str = Field(default="redis://localhost:6379/0")
    redis_cache_ttl: int = Field(default=3600, ge=1)

    # JWT & Security
    jwt_secret_key: str
    jwt_algorithm: str = Field(default="HS256")
    jwt_expiration_hours: int = Field(default=24, ge=1)
    refresh_token_expiration_days: int = Field(default=30, ge=1)
    cors_origins: list[str] = Field(default=["http://localhost:3000"])
    cors_allow_credentials: bool = Field(default=True)

    # API Keys
    openai_api_key: Optional[str] = Field(default=None)
    gemini_api_key: Optional[str] = Field(default=None)

    # Email
    smtp_host: str = Field(default="smtp.gmail.com")
    smtp_port: int = Field(default=587, ge=1, le=65535)
    smtp_user: Optional[str] = Field(default=None)
    smtp_password: Optional[str] = Field(default=None)
    smtp_from_email: Optional[str] = Field(default=None)

    # Monitoring
    sentry_dsn: Optional[str] = Field(default=None)
    datadog_api_key: Optional[str] = Field(default=None)

    # Feature Flags
    enable_ml_predictions: bool = Field(default=True)
    enable_fairness_checks: bool = Field(default=True)
    enable_real_time_updates: bool = Field(default=True)

    @field_validator("environment")
    @classmethod
    def validate_environment(cls, v: str) -> str:
        """Validate environment value."""
        valid_envs = ["development", "staging", "production"]
        if v not in valid_envs:
            raise ValueError(f"Environment must be one of {valid_envs}")
        return v

    class Config:
        """Settings configuration."""

        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False

    @property
    def is_production(self) -> bool:
        """Check if running in production."""
        return self.environment == "production"

    @property
    def is_development(self) -> bool:
        """Check if running in development."""
        return self.environment == "development"


@lru_cache()
def get_settings() -> Settings:
    """Get cached application settings."""
    return Settings()
