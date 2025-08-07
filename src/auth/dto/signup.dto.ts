import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator'

export class SignupDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'Ellen',
  })
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'Email of the user',
    example: 'pengenganteng@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    description: 'Password of the user',
    example: 'pengenganteng',
  })
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty({
    description: 'Role Id of the user',
    example:
      '4eaa3e1f-355a-4dd2-8548-f8db7a72bf82',
  })
  @IsInt()
  @IsNotEmpty()
  roleId: string

  @ApiProperty({
    description: 'Organization Id of the user',
    example:
      'b080e490-c83e-48a2-8894-453ba7fd66a0',
  })
  @IsInt()
  @IsNotEmpty()
  organizationId: string

  @ApiProperty({
    description: 'Team Id of the user',
    example:
      '04a38e34-a8fb-4309-92ed-c9d2025af27e',
  })
  @IsInt()
  @IsNotEmpty()
  teamId: string
}
