export default function Table({people}) {
    return (
        <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <tbody className="bg-white">
                            {people.map((items:[], index:number) => {
                                return (
                                    <ol>
                                        <tr key={index} className={index % 2 === 0 ? undefined : 'bg-gray-50'}>
                                            {items.map((subItems, sIndex) => {
                                                return <td> {subItems} </td>;
                                            })}
                                        </tr>
                                    </ol>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
