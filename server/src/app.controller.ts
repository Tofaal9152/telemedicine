import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/decorators';

@Public()
@Controller()
export class AppController {
  @Get()
  getHello() {
    return `
      <div style="min-height: 100vh; display: flex; justify-content: center; align-items: center; background-color: #000; font-family: Arial, sans-serif; color: #fff;">
        <div style="background: #1e1e1e; padding: 40px; border-radius: 15px; max-width: 600px; width: 100%; text-align: center; box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);">
          <h1 style="margin-bottom: 20px;">🚀 Hello World!</h1>
          <p style="margin-bottom: 10px;">The server is running smoothly.</p>
          <p style="margin-bottom: 10px;">✅ Server is running and ready to handle requests.</p>
          <p style="margin-bottom: 20px;">Enjoy building with NestJS</p>
          <img 
            src="https://www.hostgator.com/blog/wp-content/uploads/2021/03/How-Much-Does-It-Cost-to-Build-a-Gaming-Server-.jpg" 
            alt="Placeholder Image"
            style="max-width: 500px; width: 100%; height: auto; border-radius: 10px; margin-bottom: 20px;"
          />
          <p style="color: #aaa;">Need help? Check the server logs or documentation..</p>
        </div>
      </div>
    `;
  }
}
