import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  /**
   * Perform a health check for the application.
   * This method is intentionally left empty as it doesn't require any specific logic.
   * It serves as a route for checking the health of the application.
   *
   * @returns {void} This method does not have any return value.
   */
  @Get('health')
  healthCheck(): void {
    /** The method is intentionally left empty for health check purposes. **/
  }
}
