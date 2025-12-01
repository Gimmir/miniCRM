import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export function formatTime(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function formatDateTime(date: Date | string): string {
    return `${formatDate(date)} ${formatTime(date)}`;
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH",
    }).format(amount);
}

export function formatPhoneNumber(phone: string): string {
    // Format Ukrainian phone numbers
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 12 && cleaned.startsWith("380")) {
        return `+${cleaned.slice(0, 3)} (${cleaned.slice(3, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10)}`;
    }
    return phone;
}

export function getInitials(firstName: string, lastName?: string): string {
    if (lastName) {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    return firstName.slice(0, 2).toUpperCase();
}

export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
