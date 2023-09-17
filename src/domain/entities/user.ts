import { randomUUID } from 'node:crypto'
import { Optional } from '../helpers/optional'

export interface UserEntityProps {
  _id: string
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt?: Date | null
  role: 'admin' | 'member'
}

export class UserEntity {
  private props: UserEntityProps

  constructor(props: UserEntityProps) {
    this.props = props
  }

  get id(): string {
    return this.props._id
  }

  set id(id: string) {
    this.props._id = id
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get email(): string {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get password(): string {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  set updatedAt(updatedAt: Date | null | undefined) {
    this.props.updatedAt = updatedAt
  }

  get role(): 'admin' | 'member' {
    return this.props.role
  }

  set role(role: 'admin' | 'member') {
    this.props.role = role
    this.touch()
  }

  touch() {
    this.updatedAt = new Date()
  }

  static create(
    props: Optional<UserEntityProps, 'createdAt' | '_id'>,
  ): UserEntity {
    return new UserEntity({
      ...props,
      _id: props._id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    })
  }
}
