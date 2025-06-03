abstract class Person {
    private Id: string;
    private name: string;

    constructor(Id: string, name: string) {
        this.Id = Id;
        this.name = name;
    }

    public getId(): string {
        return this.Id;
    }

    public getName(): string {
        return this.name;
    }
}