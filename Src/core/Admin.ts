class Admin extends Person {
    private role: string;

    constructor(id: string, name: string, role: string) {
        super(id, name);
        this.role = role;
    }

    public manageCinema(): void {
        // Logic to manage cinemas
    }

    public manageStaff(): void {
        // Logic to manage staff
    }
}