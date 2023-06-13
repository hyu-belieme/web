abstract class BaseVo {
  public abstract equals(oth: any): boolean;

  public static equalsForNullable(a: BaseVo | undefined | null, b: BaseVo | undefined | null) {
    if (a === undefined) return b === undefined;
    if (a === null) return b === null;
    return a.equals(b);
  }
}

export default BaseVo;
