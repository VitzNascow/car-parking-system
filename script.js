(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calcTime(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s`;
    }
    function courtyard() {
        function read() {
            return localStorage.courtyard ? JSON.parse(localStorage.courtyard) : [];
        }
        function save(cars) {
            localStorage.setItem("courtyard", JSON.stringify(cars));
        }
        function add(car, saves) {
            var _a, _b;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${car.name}</td>
                <td>${car.lplate}</td>
                <td>${car.entry}</td>
                <td>
                    <button class ="delete" data-lplate= "${car.lplate}">
                        X
                    </button>
                </td>
                `;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remove(this.dataset.lplate);
            });
            (_b = $("#courtyard")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (saves)
                save([...read(), car]);
        }
        function remove(lplate) {
            const { entry, name } = read().find(car => car.lplate === lplate);
            const time = calcTime(new Date().getTime() - new Date(entry).getTime());
            if (!confirm(`O veículo ${name} permaneceu por ${time}. Deseja encerrar?`))
                return;
            save(read().filter((car) => car.lplate !== lplate));
            render();
        }
        function render() {
            $("#courtyard").innerHTML = "";
            const courtyard = read();
            if (courtyard.length) {
                courtyard.forEach((car) => add(car));
            }
        }
        return { read, add, remove, save, render };
    }
    courtyard().render();
    (_a = $("#register")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const name = (_a = $("#name")) === null || _a === void 0 ? void 0 : _a.value;
        const lplate = (_b = $("#license-plate")) === null || _b === void 0 ? void 0 : _b.value;
        if (!name || !lplate) {
            alert("Os campos nome e placa são obrigatórios");
            return;
        }
        courtyard().add({ name, lplate, entry: new Date().toISOString() }, true);
    });
})();
