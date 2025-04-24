import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';  
import { Language } from 'src/modules/language/entities/language.entity';

@Injectable()
export class UserResourceGuard implements CanActivate {

  constructor(private readonly em: EntityManager, ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;  


    const languageId = request.params.languageId;
    console.log('language id:', languageId)  

    if (!languageId) {
      throw new ForbiddenException('Language ID is required');
    }

    const language = await this.em.findOne(Language, { id: languageId });

    if (!language) {
      throw new ForbiddenException('Language not found');
    }

    if (language.user.id !== userId) {
      throw new ForbiddenException('You do not have access');
    }

    return true; 
  }
}
