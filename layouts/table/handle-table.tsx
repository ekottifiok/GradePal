'use client'
import type {ChangeEvent, ForwardedRef, MouseEvent, ReactNode} from "react";
import {PureComponent, forwardRef, useCallback, useEffect, useRef, useState} from "react";
import {Box, Card, Paper, Table, TableBody, TableContainer, TablePagination} from "@mui/material";
import ReactToPrint from "react-to-print";
import IconButton from "@mui/material/IconButton";
import type {
  AllModelsEnum,
  HandleTableEnum,
  HandleTableTypes,
  HeadLabelParameters,
  TableOptions,
} from "@components/interface";
import {TableOrder} from "@components/interface";
import {Scrollbar} from "@components/scrollbar";
import {Iconify} from "@components/iconify";
import {Loader} from "@components/loader";
import {applyFilter, getComparator, emptyRows} from "./utils";
import {TableToolbar} from "./table-toolbar";
import {TableHeadProps} from "./table-head-props";
import {HandleTableRow} from './handle-table-row';
import {TableEmptyRows} from "./table-empty-rows";
import {TableNoData} from "./table-no-data";

interface Parameters {
  data: HandleTableTypes[];
  headLabel: HeadLabelParameters[]
  initialOrder: string;
  modelType: HandleTableEnum;
  // printRef: MutableRefObject<null>;
  parentModel?: AllModelsEnum;
  options?: TableOptions;
}

interface ExtendedParameters extends Parameters {
  filterField: string;
  filterName: string;
  page: number;
  selected: string[];
  setPage: (i: number) => void
  setFilterField: (i: string) => void;
  setFilterName: (i: string) => void;
  setSelected: (i: string[]) => void
}

interface StateParameters extends ExtendedParameters {
  order: TableOrder;
  orderBy: string;
  rowsPerPage: number;
  filteredData: HandleTableTypes[];
}

class HandleTableClass extends PureComponent {

  state: StateParameters;

  constructor(props: ExtendedParameters) {

    super(props);

    this.state = {
      ...props,
      order: TableOrder.ASC,
      orderBy: props.initialOrder,
      rowsPerPage: 5,
      filteredData: []
    }
  }


  handleChangePage = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
    this.setState({page: newPage})
    this.state.setPage(newPage)
  }

  handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>): void => {
    const update = parseInt((event.target as { value: string }).value, 10)
    if (!Number.isNaN(update)) {
      this.setState({page: 0, rowsPerPage: update})
      this.state.setPage(0)
    }
  }

  handleClick = (_: unknown, name: string): void => {
    const selected = this.state.selected
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    this.setState({selected: newSelected});
    this.state.setSelected(newSelected)
  }

  handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      const selected = this.state.data.map((n) => n._id)
      this.setState({selected});
      this.state.setSelected(selected)
      return;
    }
    this.setState({select: []})
    this.state.setSelected([])
  }

  handleSort = (_: unknown, id: string): void => {
    if (id !== '') {
      const {orderBy, order} = this.state
      const isAsc = orderBy === id && order === TableOrder.ASC;
      this.setState({
        order: isAsc ? TableOrder.DESC : TableOrder.ASC,
        orderBy: id
      })
    }
  }

  render(): ReactNode {

    const {
      data,
      headLabel,
      filterField,
      filterName,
      modelType,
      page,
      options,
      order,
      orderBy,
      rowsPerPage,
      selected
    } = this.state


    const filteredData = applyFilter({
      inputData: data,
      comparator: getComparator(order, orderBy),
      filterField,
      filterName,
    }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const notFound = data.length === 0 && Boolean(filterName);

    return (
      <Card>
        <Scrollbar>
          <TableContainer component={Paper}>
            <Table aria-label="sticky table" stickyHeader sx={{minWidth: 800}}>
              <TableHeadProps
                headLabel={headLabel}
                numSelected={selected.length}
                onRequestSort={this.handleSort}
                onSelectAllClick={this.handleSelectAllClick}
                order={order}
                orderBy={orderBy}
                rowCount={data.length}
              />
              <TableBody>
                {filteredData.map((row) => (
                  <HandleTableRow
                    data={row}
                    handleClick={(event) => {
                      this.handleClick(event, row._id);
                    }}
                    key={row._id}
                    modelType={modelType}
                    selected={selected.includes(row._id)}
                  />
                ))}

                <TableEmptyRows
                  emptyRows={emptyRows(page, rowsPerPage, data.length)}
                  height={77}
                />
                {notFound ? <TableNoData query={filterName}/> : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component='div'
          count={data.length}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            id: "table-pagination",
            display: options?.hidePagination ? 'none' : undefined
          }}
        />
      </Card>
    )
  }
}

const HandleTableClassWrapper = forwardRef<HTMLButtonElement, ExtendedParameters>(
  function HandleTableClassWrapperFunc(
    {
      data, filterField, filterName,
      headLabel, initialOrder,
      modelType, options, page, parentModel,
      selected, setFilterName, setFilterField, setPage, setSelected
    }: ExtendedParameters, ref: ForwardedRef<HTMLButtonElement>) {
    return <HandleTableClass
      data={data}
      filterField={filterField}
      filterName={filterName}
      headLabel={headLabel}
      initialOrder={initialOrder}
      modelType={modelType}
      options={options}
      page={page}
      parentModel={parentModel}
      // @ts-expect-error -- according to the docs it's fine
      ref={ref}
      selected={selected}
      setFilterField={setFilterField}
      setFilterName={setFilterName}
      setPage={setPage}
      setSelected={setSelected}
    />
  }
)

export function HandleTable(props: Parameters): ReactNode {

  ////////////////////////////////////////////////////////

  const componentRef = useRef(null);
  const onBeforeGetContentResolve = useRef(null);

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("old boring text");

  const handleAfterPrint = useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = useCallback(() => {
    console.log("`onBeforePrint` called");

  }, []);

  const handleOnBeforeGetContent = useCallback(() => {
    console.log("`onBeforeGetContent` called");
    setLoading(true);
    setText("Loading new text...");

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }, []);

  useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const reactToPrintTrigger = useCallback(() => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return (
      <IconButton>
        <Iconify icon="material-symbols:print-rounded" sx={{
          color: 'inherit'
        }}/>
      </IconButton>
    )
  }, []);

  ///////////////////////////////////////////////////////


  const {data, initialOrder, headLabel, modelType, parentModel, options} = props
  const [filterName, setFilterName] = useState('')
  const [filterField, setFilterField] = useState(headLabel[0].id)
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState<string[]>([])


  const handleFilterByName = (event: ChangeEvent<HTMLInputElement>): void => {
    const {value} = event.target
    setPage(0)
    setFilterName(value)
    setFilterField(value)
  }

  const handleFilterField = (value: string): void => {
    setFilterField(value)
  }

  const handleFilterName = (value: string): void => {
    setFilterName(value)
  }

  const handlePage = (value: number): void => {
    setPage(value)
  }

  const handleSelected = (value: string[]): void => {
    setSelected(value)
  }

  return data.length === 0 ? <Loader /> : (
    <Box>
      <TableToolbar
        filterName={filterName}
        numSelected={selected.length}
        onFilterName={handleFilterByName}
        options={options}
        placeholder={`Search ${(parentModel || modelType).toLowerCase()}...`}
      >
        <ReactToPrint
        content={reactToPrintContent}
        documentTitle="AwesomeFileName"
        onAfterPrint={handleAfterPrint}
        onBeforeGetContent={handleOnBeforeGetContent}
        onBeforePrint={handleBeforePrint}
        removeAfterPrint
        trigger={reactToPrintTrigger}
      />
      </TableToolbar>

      <HandleTableClassWrapper
        data={data}
        filterField={filterField}
        filterName={filterName}
        headLabel={headLabel}
        initialOrder={initialOrder}
        modelType={modelType}
        options={options}
        page={page}
        parentModel={parentModel}
        ref={componentRef}
        selected={selected}
        setFilterField={handleFilterField}
        setFilterName={handleFilterName}
        setPage={handlePage}
        setSelected={handleSelected}
      />
    </Box>
  )


}
