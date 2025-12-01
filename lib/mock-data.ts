export interface Client {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
    avatar?: string;
    notes?: string;
    createdAt: string;
    totalVisits: number;
    totalSpent: number;
    lastVisit?: string;
}

export interface Service {
    id: string;
    name: string;
    description?: string;
    duration: number; // in minutes
    price: number;
    category: string;
    isActive: boolean;
}

export interface Visit {
    id: string;
    clientId: string;
    serviceIds: string[];
    date: string;
    time: string;
    status: "scheduled" | "completed" | "cancelled" | "no-show";
    totalPrice: number;
    notes?: string;
    createdAt: string;
}

export const mockClients: Client[] = [
    {
        id: "1",
        firstName: "Олена",
        lastName: "Коваленко",
        phone: "+380501234567",
        email: "olena.kovalenko@example.com",
        notes: "Постійний клієнт, любить класичний манікюр",
        createdAt: "2024-01-15T10:00:00Z",
        totalVisits: 12,
        totalSpent: 3600,
        lastVisit: "2024-11-25T14:00:00Z",
    },
    {
        id: "2",
        firstName: "Марія",
        lastName: "Шевченко",
        phone: "+380672345678",
        email: "maria.shevchenko@example.com",
        createdAt: "2024-02-20T11:30:00Z",
        totalVisits: 8,
        totalSpent: 2400,
        lastVisit: "2024-11-20T16:00:00Z",
    },
    {
        id: "3",
        firstName: "Анна",
        lastName: "Бондаренко",
        phone: "+380933456789",
        notes: "Алергія на деякі гелі",
        createdAt: "2024-03-10T09:00:00Z",
        totalVisits: 15,
        totalSpent: 4500,
        lastVisit: "2024-11-28T10:00:00Z",
    },
    {
        id: "4",
        firstName: "Ірина",
        lastName: "Мельник",
        phone: "+380504567890",
        email: "iryna.melnyk@example.com",
        createdAt: "2024-04-05T13:00:00Z",
        totalVisits: 5,
        totalSpent: 1500,
        lastVisit: "2024-11-15T12:00:00Z",
    },
];

export const mockServices: Service[] = [
    {
        id: "1",
        name: "Класичний манікюр",
        description: "Обробка нігтів, кутикули, покриття лаком",
        duration: 60,
        price: 300,
        category: "Манікюр",
        isActive: true,
    },
    {
        id: "2",
        name: "Гель-лак",
        description: "Покриття гель-лаком з дизайном",
        duration: 90,
        price: 450,
        category: "Манікюр",
        isActive: true,
    },
    {
        id: "3",
        name: "Педикюр",
        description: "Обробка стоп та нігтів",
        duration: 75,
        price: 400,
        category: "Педикюр",
        isActive: true,
    },
    {
        id: "4",
        name: "Нарощування нігтів",
        description: "Нарощування гелем або акрилом",
        duration: 120,
        price: 600,
        category: "Манікюр",
        isActive: true,
    },
    {
        id: "5",
        name: "Зняття покриття",
        description: "Зняття гель-лаку або нарощування",
        duration: 30,
        price: 150,
        category: "Додаткові послуги",
        isActive: true,
    },
    {
        id: "6",
        name: "Дизайн нігтів",
        description: "Художній дизайн, стрази, малюнки",
        duration: 45,
        price: 200,
        category: "Додаткові послуги",
        isActive: true,
    },
];

export const mockVisits: Visit[] = [
    {
        id: "1",
        clientId: "1",
        serviceIds: ["2"],
        date: "2024-12-02",
        time: "10:00",
        status: "scheduled",
        totalPrice: 450,
        createdAt: "2024-11-28T15:00:00Z",
    },
    {
        id: "2",
        clientId: "3",
        serviceIds: ["1", "6"],
        date: "2024-12-02",
        time: "14:00",
        status: "scheduled",
        totalPrice: 500,
        notes: "Клієнт просить червоний колір",
        createdAt: "2024-11-29T10:00:00Z",
    },
    {
        id: "3",
        clientId: "2",
        serviceIds: ["3"],
        date: "2024-12-03",
        time: "11:00",
        status: "scheduled",
        totalPrice: 400,
        createdAt: "2024-11-30T12:00:00Z",
    },
    {
        id: "4",
        clientId: "1",
        serviceIds: ["2"],
        date: "2024-11-25",
        time: "14:00",
        status: "completed",
        totalPrice: 450,
        createdAt: "2024-11-20T09:00:00Z",
    },
    {
        id: "5",
        clientId: "4",
        serviceIds: ["1"],
        date: "2024-11-28",
        time: "16:00",
        status: "completed",
        totalPrice: 300,
        createdAt: "2024-11-25T14:00:00Z",
    },
];

export const getClientById = (id: string): Client | undefined => {
    return mockClients.find((client) => client.id === id);
};

export const getServiceById = (id: string): Service | undefined => {
    return mockServices.find((service) => service.id === id);
};

export const getVisitsByClientId = (clientId: string): Visit[] => {
    return mockVisits.filter((visit) => visit.clientId === clientId);
};

export const getUpcomingVisits = (): Visit[] => {
    const now = new Date();
    return mockVisits
        .filter((visit) => {
            const visitDate = new Date(`${visit.date}T${visit.time}`);
            return visitDate > now && visit.status === "scheduled";
        })
        .sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA.getTime() - dateB.getTime();
        });
};

export const getTodayVisits = (): Visit[] => {
    const today = new Date().toISOString().split("T")[0];
    return mockVisits
        .filter((visit) => visit.date === today)
        .sort((a, b) => a.time.localeCompare(b.time));
};
