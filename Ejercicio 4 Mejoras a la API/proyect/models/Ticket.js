class Ticket {
    constructor(id) {
        this.id = id;
        this.articles = [];
    }

    addArticle(article, quantity) {
        this.articles.push({ article, quantity });
    }

    calculateTotal() {
        let subtotal = 0;
        this.articles.forEach(item => {
            subtotal += item.article.price * item.quantity;
        });
        const taxRate = 0.16; // 16% IVA
        const total = subtotal + (subtotal * taxRate);
        return { subtotal, total };
    }
}

module.exports = Ticket;
