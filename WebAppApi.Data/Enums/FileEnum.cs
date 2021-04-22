using System.ComponentModel;

namespace WebAppApi.Data.Enums
{
    public enum FileEnum
    {
        None = 0,
        [DefaultValue("FILE")]
        File = 1,
        [DefaultValue("FOLDER")]
        Folder = 2
    }
}
