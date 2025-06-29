import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig, validationPipeConfig } from './utils';
import { JwtAuthGuard } from './auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply Global Pipes
  app.useGlobalPipes(validationPipeConfig);

  // Enable CORS
  app.enableCors(corsConfig);

  // Roles Guard And JWT Auth Guard
  const reflector = new Reflector();
  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));

  //  server listen on the specified port
  await app.listen(process.env.PORT ?? 8089);
}
bootstrap().catch((err) => {
  if (err instanceof Error) {
    console.error('Error during application bootstrap:', err.message);
  }
});
