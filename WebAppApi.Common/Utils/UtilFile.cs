using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using WebAppApi.Data.Enums;

namespace WebAppApi.Common.Utils
{
    public static class UtilFile
    {
        private static readonly Random _random = new Random();

        public static string GetStringFromEnum<TEnum>(this TEnum enumVal)
        {
            string res = null;

            Type t = typeof(TEnum);
            var val = t.GetEnumName(enumVal);

            if (val == null)
            {
                return null;
            }
            var memInfo = t.GetMember(val);
            if (memInfo.Length > 0)
            {
                var defaultVal = memInfo[0].GetCustomAttribute<DefaultValueAttribute>();
                if (defaultVal != null && defaultVal.Value != null && defaultVal.Value.GetType() == typeof(string))
                {
                    return (string)defaultVal.Value;
                }
            }

            return res;
        }

        // Generates a random number within a range.      
        public static int RandomNumber(int min, int max)
        {
            return _random.Next(min, max);
        }
    }
}
