import {
  ApiHideProperty,
  ApiProperty,
} from '@nestjs/swagger'
import { User } from '@prisma/client'

export class UserEntity implements User {
  @ApiProperty({ example: 1 })
  name: string
  @ApiProperty({ example: 1 })
  id: string
  @ApiProperty({
    example: 'pengenganteng@gmail.com',
  })
  email: string
  @ApiProperty({ example: new Date() })
  createdAt: Date
  @ApiHideProperty()
  hash: string | null
}
