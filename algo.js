 function dijkstra(graph, start) {
    const distances = {};
    const visited = {};
    const queue = new PriorityQueue();

    // Initialize distances with Infinity for all vertices except the start vertex
    for (let vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;

    // Add the start vertex to the priority queue
    queue.enqueue(start, 0);

    while (!queue.isEmpty()) {
        const currentVertex = queue.dequeue().element;
        visited[currentVertex] = true;

        for (let neighbor in graph[currentVertex]) {
            const weight = graph[currentVertex][neighbor];
            const totalDistance = distances[currentVertex] + weight;

            // Update the distance if it's shorter than the current distance
            if (totalDistance < distances[neighbor]) {
                distances[neighbor] = totalDistance;

                // Add the neighbor to the priority queue
                queue.enqueue(neighbor, totalDistance);
            }
        }
    }

    // Remove start vertex from distances
    delete distances[start];

    return distances;
}

// Priority Queue implementation for Dijkstra's algorithm
class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        const queueElement = { element, priority };
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (queueElement.priority < this.items[i].priority) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(queueElement);
        }
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

// Example usage:
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

console.log(dijkstra(graph, 'A'));
