/**
 * This todo generator is created by ChatGPT.
 */
export type TodoType = {
    id: string;
    text: string;
    completed: boolean;
};

function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomId(): string {
    return Math.random().toString(36).substring(2);
}

function generateFunnyTodo(): { id: string; text: string; completed: boolean } {
    const verbs = ["debug", "refactor", "deploy", "test", "click", "inspect", "rewrite", "mock", "override", "comment out", "grep", "merge"];
    const adjectives = ["flaky", "deprecated", "asynchronous", "mysterious", "recursive", "unreachable", "overengineered", "misleading", "self-aware", "infinite-looping"];
    const nouns = ["test case", "promise", "console log", "merge conflict", "debugger", "VS Code extension", "stack trace", "package.json", "pull request", "CI/CD pipeline"];

    const templates = [
        "${verb} the ${adjective} ${noun}.",
        "Find out why the ${adjective} ${noun} is acting so weird.",
        "Schedule a code review for the ${adjective} ${noun}.",
        "Write a commit message explaining the ${adjective} ${noun}.",
        "Start a Stack Overflow thread about the ${adjective} ${noun}.",
        "Teach the ${adjective} ${noun} how to write tests.",
        "Convince the ${adjective} ${noun} to work on the first try.",
        "Translate the error message from the ${adjective} ${noun}.",
        "Refactor the ${adjective} ${noun} without breaking everything.",
        "Deploy the ${adjective} ${noun} and hope for the best."
    ];

    const template = getRandomElement(templates);
    const text = template
        .replace("${verb}", getRandomElement(verbs))
        .replace("${adjective}", getRandomElement(adjectives))
        .replace("${noun}", getRandomElement(nouns));

    return {
        id: generateRandomId(),
        text,
        completed: Math.random() < 0.5
    };
}

// Generate a list of funny to-do items
export function generateTodoList(count: number = 5): TodoType[] {
    return Array.from({ length: count }, generateFunnyTodo);
}

