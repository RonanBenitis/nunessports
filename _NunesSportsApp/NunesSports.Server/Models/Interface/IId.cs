namespace NunesSports.Server.Models.Interface
{
    /*
     * Esta classe garante ao compilador que todos os seus modelos possuam id,
     * possibilitando interfaces de Controladores
     */
    public interface IId
    {
        int Id { get; set; }
    }
}
