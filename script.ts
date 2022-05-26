interface Car {
    name: string;
    lplate: string;
    entry: Date | string;

}

(function () {
    const $ = (query: string): HTMLInputElement | null => 
    document.querySelector(query);

    function calcTime (mil: number) {
        
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);

        return `${min}m e ${sec}s`;
    }

    function courtyard () {
        
        function read (): Car [] {
            return localStorage.courtyard ? JSON.parse(localStorage.courtyard) :[];
        }
        
        function save (cars: Car []) {
            localStorage.setItem("courtyard", JSON.stringify(cars));
        }
        
        function add (car: Car, saves?: boolean) {
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

                row.querySelector(".delete")?.addEventListener("click", function(){
                    remove(this.dataset.lplate)
                });

                $("#courtyard")?.appendChild(row);

                if (saves) save([...read(), car]);
        }

        function remove (lplate: string) {

            const {entry, name} = read().find(car => car.lplate === lplate);
            
            const time = calcTime(new Date().getTime() - new Date (entry).getTime());
            
            if (
                !confirm(`O veículo ${name} permaneceu por ${time}. Deseja encerrar?`)
            )
            
            return;

        save(read().filter((car) => car.lplate !== lplate));
        render();
        }

        function render () {
            $("#courtyard")!.innerHTML = "";
            const courtyard = read();

            if (courtyard.length)  {
                courtyard.forEach ((car) => add(car));
            }
        }

        return { read, add, remove, save, render };
    }

    courtyard().render();

    $("#register")?.addEventListener("click", () => {
        const name = $("#name")?.value;
        const lplate = $("#license-plate")?.value;

        if(!name || !lplate) {
            alert("Os campos nome e placa são obrigatórios");
            return;
        }
        
        courtyard().add({ name, lplate, entry: new Date().toISOString()}, true)
    });
})();