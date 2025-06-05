export class Person {
  constructor(
    public id: string,
    public name: string
  ) {}
  getId(): string {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  setName(name: string): void {
    this.name = name;
  }
  setId(id: string): void {
    this.id = id;
  }

}
