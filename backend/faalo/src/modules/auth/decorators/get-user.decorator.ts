import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator(
    (data: string | undefined, context: ExecutionContext) => {
        const request: Express.Request = context.switchToHttp().getRequest();
        console.log('Request user:', request.user);

        if (!request.user) {
            throw new Error('Usuário não autenticado');
        }

        if(data){
            return request.user[data];
        }

        return request.user;
        
    }
);